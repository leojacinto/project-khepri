import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

// =====================================================
// EXTRACT COST CENTER FLOW
// Triggered when an expense event is created.
// Looks up the event record and returns cost center,
// vendor, and amount data.
// =====================================================

Flow(
    {
        $id: Now.ID['khepri-extract-cc-flow'],
        name: 'Khepri Extract Cost Center',
        description:
            'Extract cost center, vendor, and amount from the latest expense transaction event. Triggered when a new expense event is created in x_snc_khepri_expense_event.',
        runAs: 'system',
    },

    wfa.trigger(
        trigger.record.created,
        { $id: Now.ID['extract-cc-trigger'] },
        {
            table: 'x_snc_khepri_expense_event',
            condition: 'event_idISNOTEMPTY',
            run_flow_in: 'background',
            run_on_extended: 'false',
            run_when_setting: 'both',
            run_when_user_setting: 'any',
            run_when_user_list: [],
        }
    ),

    (_params) => {
        // Log the extracted data
        wfa.action(
            action.core.log,
            {
                $id: Now.ID['extract-cc-log'],
                annotation: 'Log extracted cost center data',
            },
            {
                log_level: 'info',
                log_message: `Extracted cost center: ${wfa.dataPill(_params.trigger.current.cost_center, 'string')}, vendor: ${wfa.dataPill(_params.trigger.current.vendor, 'string')}, amount: ${wfa.dataPill(_params.trigger.current.amount_usd, 'string')}, event_id: ${wfa.dataPill(_params.trigger.current.event_id, 'string')}`,
            }
        )
    }
)
