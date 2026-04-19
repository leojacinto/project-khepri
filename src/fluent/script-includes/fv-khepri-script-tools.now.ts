import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// =====================================================
// Script Include: Extract Cost Center
// Queries x_snc_khepri_expense_event for event data
// =====================================================
// =====================================================
// Script Include: Budget Variance Analysis
// Computes projected variance and returns assessment
// =====================================================
// =====================================================
// sn_aia_tool: Extract Cost Center (type: custom/script)
// Replaces the Forecast Variance subflow tool
// =====================================================
export const khepriExtractCostCenterTool = Record({
    $id: Now.ID['khepri-extract-cc-tool'],
    table: 'sn_aia_tool',
    data: {
        name: 'Khepri Extract Cost Center',
        type: 'script',
        active: 'true',
        record_type: 'custom',
        description:
            'Extract cost center, vendor, and amount from the latest expense transaction event or by event ID. Queries the x_snc_khepri_expense_event table.',
        script: "var extractor = new KhepriExtractCostCenter();\nvar result = extractor.extract(inputs.event_id || '');\noutputs.result = result;",
        input_schema: JSON.stringify([
            {
                name: 'event_id',
                type: 'string',
                description: 'Optional event ID to look up. If not provided, returns the most recent event.',
                mandatory: false,
            },
        ]),
    },
})

// Budget Variance Analysis is now a Flow, not a script tool.
// See src/fluent/flows/budget-variance-analysis.now.ts
