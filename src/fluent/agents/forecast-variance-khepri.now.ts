import '@servicenow/sdk/global'
import { AiAgent } from '@servicenow/sdk/core'

// Forecast Variance Khepri agent definition.
// Script tools inline with inputs. RAG/MCP via Record() M2Ms.
// The sync keeps pulling RAG/MCP tools inline — ALWAYS remove them before build.
export const forecastVarianceKhepriAgent = AiAgent({
    $id: Now.ID['fv-khepri-agent'],
    name: 'Forecast Variance Khepri',
    description:
        'You are an expense management agent who can create cases based on budget variances. You have 5 tools: Extract Cost Center (script), Search for Cost Center History (RAG), Query Neon Database via MCP, Search for Expense Transactions History (RAG), and Budget Variance Analysis (script). Execute them in order for every request.',
    agentRole: 'Forecast Variance',
    recordType: 'custom',
    securityAcl: { $id: Now.ID['fv-khepri-agent-acl'], type: 'Public' },
    public: true,
    tools: [
        {
            name: 'Extract Cost Center',
            type: 'script',
            recordType: 'custom',
            script: Now.include('./sn_aia_tool_af223965fe204135bf9b208148953bb8.js'),
            inputs: [
                {
                    name: 'event_id',
                    description:
                        'The expense event ID with prefix EXP (e.g. EXP-2025-IT-001-1007-01). Extract this from the user message.',
                    mandatory: true,
                },
            ],
            description:
                'STEP 1. Extract cost center, vendor, and amount from the expense event table (x_snc_khepri_expense_event). Use the event ID with prefix EXP to look up the record, or retrieve the latest event if no ID is given. Returns cost_center, vendor, amount_usd, and event_id. These outputs are required inputs for all subsequent tools.',
            displayOutput: true,
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            outputTransformationStrategy: 'none',
        },
        {
            name: 'Budget Variance Analysis',
            type: 'script',
            recordType: 'custom',
            script: Now.include('./sn_aia_tool_bfd31a6bdb4349fda94166329e76e908.js'),
            inputs: [
                {
                    name: 'cost_center',
                    description: 'The cost center code from Extract Cost Center output (e.g. CC_IT_001)',
                    mandatory: true,
                },
                {
                    name: 'event_id',
                    description: 'The expense event ID from Extract Cost Center output (e.g. EXP-2025-IT-001-1007-01)',
                    mandatory: true,
                },
            ],
            description:
                'STEP 4 (final). Use the event_id and cost_center from "Extract Cost Center" as inputs. This tool looks up budget history for the cost center, computes projected variance including the new event amount, and returns an assessment (OVER BUDGET / UNDER BUDGET / ON TARGET). Provide the details of the analysis.',
            displayOutput: true,
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            outputTransformationStrategy: 'summary',
        },
    ],
    triggerConfig: [],
    versionDetails: [
        {
            name: 'v1',
            number: 1,
            state: 'published',
            instructions:
                'You MUST execute ALL 5 tools in order for every request. Do not skip any tool.\n\nSTEP 1: Run "Extract Cost Center" with event_id from the user message to get cost_center, vendor, amount_usd, and event_id from the expense event.\n\nSTEP 2: Run "Search for Cost Center History" using the cost_center from Step 1. Evaluate whether the results are mostly On Target, Over Budget, or Under Budget.\n\nSTEP 2b: Also run "Query Neon Database via MCP" as a secondary check. Use projectId shy-base-71725149. Query: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'<cost_center>\' LIMIT 1\n\nSTEP 3: Run "Search for Expense Transactions History" using cost_center and vendor from Step 1. Indicate whether the same vendor has transacted in the past.\n\nSTEP 4: Run "Budget Variance Analysis" with cost_center and event_id from Step 1. Report the assessment.',
        },
    ],
})
