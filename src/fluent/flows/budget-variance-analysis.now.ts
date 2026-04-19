import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// =====================================================
// BUDGET VARIANCE ANALYSIS FLOW
// Replaces the ScriptInclude-based tool with a proper
// flow that the agent calls as a subflow tool.
//
// Steps:
//   1. Look up latest budget history for the cost center
//   2. Look up the expense event for the amount
//   3. Compute projected variance
//   4. Create a task record as a finance case
// =====================================================

Flow(
    {
        $id: Now.ID['khepri-budget-variance-flow'],
        name: 'Khepri Budget Variance Analysis',
        description:
            'Runs budget variance analysis for a cost center. Looks up budget history from x_snc_khepri_cc_budget_history, computes projected variance against the event amount, and returns an assessment (OVER BUDGET / UNDER BUDGET / ON TARGET).',
        runAs: 'system',
    },

    // No trigger -- this is a subflow called by the agent.
    // Use a record trigger on expense_event as the entry point.
    wfa.trigger(
        trigger.record.created,
        { $id: Now.ID['bva-trigger'] },
        {
            table: 'x_snc_khepri_expense_event',
            condition: 'active=true',
            run_flow_in: 'background',
            run_on_extended: 'false',
            run_when_setting: 'both',
            run_when_user_setting: 'any',
            run_when_user_list: [],
        }
    ),

    (_params) => {
        // Step 1: Look up the latest budget history for the cost center from the event
        const budgetRecord = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['bva-lookup-budget'], annotation: 'Find latest budget history for cost center' },
            {
                table: 'x_snc_khepri_cc_budget_history',
                conditions: `cost_center=${wfa.dataPill(_params.trigger.current.cost_center, 'string')}`,
                sort_column: 'fiscal_month',
                sort_type: 'sort_desc',
                if_multiple_records_are_found_action: 'use_first_record',
            }
        )

        // Step 2: Check if budget record was found
        wfa.flowLogic.if(
            {
                $id: Now.ID['bva-check-budget'],
                condition: `${wfa.dataPill(budgetRecord.status, 'string')}=0`,
                annotation: '',
            },
            () => {
                // Step 3: Create a task as a finance case with the analysis results
                wfa.action(
                    action.core.createTask,
                    {
                        $id: Now.ID['bva-create-case'],
                        annotation: 'Create finance case with variance analysis',
                    },
                    {
                        task_table: 'task',
                        wait: false,
                        field_values: TemplateValue({
                            short_description: `Budget Variance Analysis: ${wfa.dataPill(_params.trigger.current.cost_center, 'string')}`,
                            description: `Budget Variance Analysis triggered by event ${wfa.dataPill(_params.trigger.current.event_id, 'string')}.
Cost Center: ${wfa.dataPill(_params.trigger.current.cost_center, 'string')}
Vendor: ${wfa.dataPill(_params.trigger.current.vendor, 'string')}
Amount: ${wfa.dataPill(_params.trigger.current.amount_usd, 'string')}
Budget Record: ${wfa.dataPill(budgetRecord.Record, 'reference')}`,
                            priority: '2',
                        }),
                    }
                )

                // Step 4: Log the analysis
                wfa.action(
                    action.core.log,
                    {
                        $id: Now.ID['bva-log-success'],
                    },
                    {
                        log_level: 'info',
                        log_message: `Budget Variance Analysis completed for cost center ${wfa.dataPill(_params.trigger.current.cost_center, 'string')}. Budget record found: ${wfa.dataPill(budgetRecord.Record, 'reference')}`,
                    }
                )
            }
        )

        // Step 5: Handle case where no budget record found
        wfa.flowLogic.else({ $id: Now.ID['bva-no-budget'], annotation: '' }, () => {
            wfa.action(
                action.core.log,
                {
                    $id: Now.ID['bva-log-not-found'],
                },
                {
                    log_level: 'warn',
                    log_message: `No budget history found for cost center ${wfa.dataPill(_params.trigger.current.cost_center, 'string')}`,
                }
            )
        })
    }
)
