import '@servicenow/sdk/global'
import { ScriptInclude, Record } from '@servicenow/sdk/core'

// --- ScriptInclude: KhepriAgentPlaybook ---
// Field guide for building AI Agents, searchable from any conversation.
// Search: keyword_search("Khepri Agent Playbook", contentMode: "full")
export const KhepriAgentPlaybook = ScriptInclude({
    $id: Now.ID['KhepriAgentPlaybook'],
    name: 'KhepriAgentPlaybook',
    script: Now.include('../../server/script-includes/khepri-agent-playbook.js'),
    description: 'Khepri Agent Playbook - field guide for building AI Agents via Build Agent chat. Search for "Khepri Agent Playbook" from any conversation to read this. Contains pre-flight checklist, build agent procedure, tool type decision matrix, RAG pipeline checklist, MCP connection checklist, error analysis protocol, and constraints reference.',
    accessibleFrom: 'public',
    active: false,
})

// --- ScriptInclude: KhepriExtractCostCenter ---
// Queries x_snc_khepri_expense_event for event data
export const KhepriExtractCostCenter = ScriptInclude({
    $id: Now.ID['KhepriExtractCostCenter'],
    name: 'KhepriExtractCostCenter',
    script: Now.include('../../server/script-includes/khepri-extract-cost-center.js'),
    description: 'Extract cost center, vendor, and amount from the latest expense transaction event or by event ID. Queries the x_snc_khepri_expense_event table.',
    accessibleFrom: 'public',
    active: true,
})

// --- ScriptInclude: KhepriBudgetVarianceAnalysis ---
// Computes projected variance and returns assessment
export const KhepriBudgetVarianceAnalysis = ScriptInclude({
    $id: Now.ID['KhepriBudgetVarianceAnalysis'],
    name: 'KhepriBudgetVarianceAnalysis',
    script: Now.include('../../server/script-includes/khepri-budget-variance-analysis.js'),
    description: 'Runs budget variance analysis for a cost center. Looks up budget history, computes projected variance against an expense event amount, creates a Finance Case, and returns an assessment.',
    accessibleFrom: 'public',
    active: true,
})

// --- sn_aia_tool: Khepri Extract Cost Center (standalone) ---
// This is a SEPARATE tool record from the inline one on the AiAgent.
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
