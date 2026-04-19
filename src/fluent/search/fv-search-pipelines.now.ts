import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// =====================================================
// FORECAST VARIANCE KHEPRI: Search Pipelines + Tool M2Ms
//
// CORRECT PATTERN (copied from working FV app x_snc_forecast_v_0):
//   ais_datasource_field_attribute — maps fields to title/text roles
//   ais_datasource_attribute — datasource-level settings
//
// DEPRECATED (does NOT trigger indexing):
//   ais_datasource_semantic_field_m2m — do NOT use
//
// After install, user must manually trigger indexing from
// AI Search Admin Console → Datasource → Index Now
// =====================================================

// === Field attribute reference ===
// attribute: f734a634c7320010d1cfd9795cc26094 = "content_type" (field role: title/text)
// attribute: 2dd8f14753320010ffaaddeeff7b1293 = datasource-level setting (value: false)

// === PIPELINE 1: CC Budget History ===

// Search Application (sys_search_context_config) — copied from working FV app
// All field values identical to FV except name and search_profile reference
export const fvCcBudgetSearchApp = Record({
    $id: Now.ID['fv-cc-budget-search-app'],
    table: 'sys_search_context_config',
    data: {
        name: 'Khepri CC Budget History Search Application',
        search_engine: 'ai_search',
        search_profile: '8d3c1e8838cc4ee28b415ce05274e0ff',
        search_results_limit: '10',
        suggestions_to_show_limit: '10',
        document_match_count: '3',
        document_match_threshold: '0.65',
        genius_results_limit: '1',
        attachment_limit: '5',
        enable_exact_match: 'true',
        enable_semantic_search: 'false',
        enable_hybrid_search: 'false',
        spell_check: 'true',
        hit_highlighting: 'false',
        show_tab_counts: 'true',
        show_disabled_facets: 'false',
        collapse_attachment: 'true',
        filter_genius_results_by_search_source: 'false',
        log_signals_server_side: 'false',
    },
})

// Semantic snippetization config — copied from FV app
// Defines how text is chunked for semantic search
export const fvCcBudgetSnippetConfig = Record({
    $id: Now.ID['fv-cc-budget-snippet-config'],
    table: 'ais_semantic_snippetization_configuration',
    data: {
        snippet_mode: 'PASSAGE',
        limited_by: 'WORDS',
        limit: '250',
        max_total_words: '500',
        overlap_sentences: '5',
    },
})

// Semantic index configuration — links datasource to embedding model + snippetization
// embedding_models: c153d0f2432302104611495d9bb8f2ec (platform default)
export const fvCcBudgetSemanticIndex = Record({
    $id: Now.ID['fv-cc-budget-semantic-index'],
    table: 'ais_semantic_index_configuration',
    data: {
        semantic_field_name: 'KhepriCostCenterBudgetHistory',
        datasource: 'x_snc_khepri_cc_budget_history',
        active: 'true',
        embedding_models: 'c153d0f2432302104611495d9bb8f2ec',
        conflict: 'false',
        semantic_snippetization_configuration: '8fe647da2fd48b58920fa33fafa4e3db',
    },
})

// Datasource field attributes (tells AIS which fields to index and their roles)
export const fvCcBudgetFieldAttr_costCenter = Record({
    $id: Now.ID['fv-cc-budget-fa-cost-center'],
    table: 'ais_datasource_field_attribute',
    data: {
        datasource: '53e8cd29e882462880f8f9f8dc9a509d',
        source: 'x_snc_khepri_cc_budget_history',
        field: 'cost_center',
        attribute: 'f734a634c7320010d1cfd9795cc26094',
        value: 'title',
    },
})

export const fvCcBudgetFieldAttr_description = Record({
    $id: Now.ID['fv-cc-budget-fa-description'],
    table: 'ais_datasource_field_attribute',
    data: {
        datasource: '53e8cd29e882462880f8f9f8dc9a509d',
        source: 'x_snc_khepri_cc_budget_history',
        field: 'cost_center_description',
        attribute: 'f734a634c7320010d1cfd9795cc26094',
        value: 'text',
    },
})

// Datasource-level attribute
export const fvCcBudgetDatasourceAttr = Record({
    $id: Now.ID['fv-cc-budget-ds-attr'],
    table: 'ais_datasource_attribute',
    data: {
        datasource: '53e8cd29e882462880f8f9f8dc9a509d',
        source: 'x_snc_khepri_cc_budget_history',
        attribute: '2dd8f14753320010ffaaddeeff7b1293',
        value: 'false',
    },
})

// Search profile
export const fvCcBudgetSearchProfile = Record({
    $id: Now.ID['fv-cc-budget-search-profile'],
    table: 'ais_search_profile',
    data: {
        name: 'x_snc_khepri_cc_budget_history_search_profile',
        label: 'Khepri CC Budget History Search Profile',
        description: '[khepri-auto-publish] Cost center budget history for Forecast Variance Khepri.',
        active: 'true',
        state: 'PUBLISHED',
        exclude_from_evaluation: 'false',
        qna_model_id: 'bert-qa-model-1.1.6',
    },
})

// Profile-source M2M (hardcoded sys_ids from platform)
export const fvCcBudgetProfileSourceM2M = Record({
    $id: Now.ID['fv-cc-budget-profile-source-m2m'],
    table: 'ais_search_profile_ais_search_source_m2m',
    data: {
        profile: '8d3c1e8838cc4ee28b415ce05274e0ff',
        search_source: '30f3d0ef656f44ff92d554b399a0da43',
    },
})

// RAG tool M2M: CC Budget History -> Agent
export const fvKhepriToolSearchCCHist = Record({
    $id: Now.ID['fv-khepri-tool-search-cc-hist'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        agent: '53e05c74f31d4534afddc3aff5609449',
        tool: '0768f1dffbd246a0b1e59e5dd0b64962',
        name: 'Search for Cost Center History',
        description:
            'STEP 2. Take the cost_center from "Extract Cost Center" output and use it as the search query. Evaluate whether the cost center is mostly "On Target", "Over Budget", or "Under Budget" across fiscal months.',
        active: 'true',
        execution_mode: 'autopilot',
        display_output: 'true',
        display_mode: 'inline',
        max_auto_executions: '10',
        output_transformation_strategy: 'custom',
        requires_widget_transformation: 'true',
        transformation_instructions:
            'Evaluate whether the results are mostly "On Target", "Over Budget", or "Under Budget." Do not display the raw search results.',
        inputs: JSON.stringify([
            { name: 'search_type', description: 'Search type', value: 'semantic' },
            { name: 'query', description: 'search query for Cost Center Budget History' },
            {
                name: 'search_profile',
                value: 'x_snc_khepri_cc_budget_history_search_profile',
                label: 'Khepri CC Budget History Search Profile',
                description: 'Search profile',
            },
            {
                name: 'sources',
                label: ['Khepri CC Budget History Indexed Source'],
                value: ['x_snc_khepri_cc_budget_history'],
                description: 'Search sources',
            },
            {
                name: 'fields',
                label: [
                    'Cost Center [x_snc_khepri_cc_budget_history]',
                    'Cost Center Description [x_snc_khepri_cc_budget_history]',
                ],
                value: [
                    'x_snc_khepri_cc_budget_history.cost_center',
                    'x_snc_khepri_cc_budget_history.cost_center_description',
                ],
                description: 'Fields to be returned',
            },
            { name: 'document_match_threshold', value: 0, description: 'Document matching threshold' },
            { name: 'semantic_index_names', label: ['KhepriCostCenterBudgetHistory'], value: ['KhepriCostCenterBudgetHistory'], description: 'Semantic indexed fields' },
        ]),
    },
})

// === PIPELINE 2: Expense Transactions ===

// Search Application (sys_search_context_config) — copied from working FV app
export const fvExpenseSearchApp = Record({
    $id: Now.ID['fv-expense-search-app'],
    table: 'sys_search_context_config',
    data: {
        name: 'Khepri Expense Transactions Search Application',
        search_engine: 'ai_search',
        search_profile: 'a4489a241b0c4b44bd40086b702adde6',
        search_results_limit: '10',
        suggestions_to_show_limit: '10',
        document_match_count: '3',
        document_match_threshold: '0.65',
        genius_results_limit: '1',
        attachment_limit: '5',
        enable_exact_match: 'true',
        enable_semantic_search: 'false',
        enable_hybrid_search: 'false',
        spell_check: 'true',
        hit_highlighting: 'false',
        show_tab_counts: 'true',
        show_disabled_facets: 'false',
        collapse_attachment: 'true',
        filter_genius_results_by_search_source: 'false',
        log_signals_server_side: 'false',
    },
})

// Semantic snippetization config — copied from FV app
export const fvExpenseSnippetConfig = Record({
    $id: Now.ID['fv-expense-snippet-config'],
    table: 'ais_semantic_snippetization_configuration',
    data: {
        snippet_mode: 'PASSAGE',
        limited_by: 'WORDS',
        limit: '250',
        max_total_words: '500',
        overlap_sentences: '5',
    },
})

// Semantic index configuration — links datasource to embedding model + snippetization
export const fvExpenseSemanticIndex = Record({
    $id: Now.ID['fv-expense-semantic-index'],
    table: 'ais_semantic_index_configuration',
    data: {
        semantic_field_name: 'KhepriExpenseTransactions',
        datasource: 'x_snc_khepri_expense_transactions',
        active: 'true',
        embedding_models: 'c153d0f2432302104611495d9bb8f2ec',
        conflict: 'false',
        semantic_snippetization_configuration: '33e6cf5e2fd48b58920fa33fafa4e397',
    },
})

// Datasource field attributes
export const fvExpenseFieldAttr_vendor = Record({
    $id: Now.ID['fv-expense-fa-vendor'],
    table: 'ais_datasource_field_attribute',
    data: {
        datasource: '83195ee15ef248fda68c14c4265de528',
        source: 'x_snc_khepri_expense_transactions',
        field: 'vendor',
        attribute: 'f734a634c7320010d1cfd9795cc26094',
        value: 'title',
    },
})

export const fvExpenseFieldAttr_description = Record({
    $id: Now.ID['fv-expense-fa-description'],
    table: 'ais_datasource_field_attribute',
    data: {
        datasource: '83195ee15ef248fda68c14c4265de528',
        source: 'x_snc_khepri_expense_transactions',
        field: 'description',
        attribute: 'f734a634c7320010d1cfd9795cc26094',
        value: 'text',
    },
})

// Datasource-level attribute
export const fvExpenseDatasourceAttr = Record({
    $id: Now.ID['fv-expense-ds-attr'],
    table: 'ais_datasource_attribute',
    data: {
        datasource: '83195ee15ef248fda68c14c4265de528',
        source: 'x_snc_khepri_expense_transactions',
        attribute: '2dd8f14753320010ffaaddeeff7b1293',
        value: 'false',
    },
})

// Search profile
export const fvExpenseSearchProfile = Record({
    $id: Now.ID['fv-expense-search-profile'],
    table: 'ais_search_profile',
    data: {
        name: 'x_snc_khepri_expense_transactions_search_profile',
        label: 'Khepri Expense Transactions Search Profile',
        description: '[khepri-auto-publish] Expense transactions for Forecast Variance Khepri.',
        active: 'true',
        state: 'PUBLISHED',
        exclude_from_evaluation: 'false',
        qna_model_id: 'bert-qa-model-1.1.6',
    },
})

// Profile-source M2M (hardcoded sys_ids from platform)
export const fvExpenseProfileSourceM2M = Record({
    $id: Now.ID['fv-expense-profile-source-m2m'],
    table: 'ais_search_profile_ais_search_source_m2m',
    data: {
        profile: 'a4489a241b0c4b44bd40086b702adde6',
        search_source: '8b0c604638e047c88cb0b9c4ec9890af',
    },
})

// RAG tool M2M: Expense Transactions -> Agent
export const fvKhepriToolSearchExpenses = Record({
    $id: Now.ID['fv-khepri-tool-search-expenses'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        agent: '53e05c74f31d4534afddc3aff5609449',
        tool: 'b85683d49c334deb9020b0818dbc5764',
        name: 'Search for Expense Transactions History',
        description:
            'STEP 3. Take the cost_center AND vendor from "Extract Cost Center" output and use them as the search query. Indicate whether the same vendor has transacted with this cost center in the past.',
        active: 'true',
        execution_mode: 'autopilot',
        display_output: 'true',
        display_mode: 'inline',
        max_auto_executions: '10',
        output_transformation_strategy: 'custom',
        requires_widget_transformation: 'true',
        transformation_instructions:
            'Indicate if there are similar transactions for the vendor in the past based on the cost center being processed.',
        inputs: JSON.stringify([
            { name: 'search_type', description: 'Search type', value: 'semantic' },
            { name: 'query', description: 'search query for Expense Transactions' },
            {
                name: 'search_profile',
                value: 'x_snc_khepri_expense_transactions_search_profile',
                label: 'Khepri Expense Transactions Search Profile',
                description: 'Search profile',
            },
            {
                name: 'sources',
                label: ['Khepri Expense Transactions Indexed Source'],
                value: ['x_snc_khepri_expense_transactions'],
                description: 'Search sources',
            },
            {
                name: 'fields',
                label: [
                    'Vendor [x_snc_khepri_expense_transactions]',
                    'Expense Category [x_snc_khepri_expense_transactions]',
                    'Description [x_snc_khepri_expense_transactions]',
                ],
                value: [
                    'x_snc_khepri_expense_transactions.vendor',
                    'x_snc_khepri_expense_transactions.expense_category',
                    'x_snc_khepri_expense_transactions.description',
                ],
                description: 'Fields to be returned',
            },
            { name: 'document_match_threshold', value: 0, description: 'Document matching threshold' },
            { name: 'semantic_index_names', label: ['KhepriExpenseTransactions'], value: ['KhepriExpenseTransactions'], description: 'Semantic indexed fields' },
        ]),
    },
})

// MCP tool M2M: Neon SQL Query -> Agent
export const fvKhepriToolNeonMcp = Record({
    $id: Now.ID['fv-khepri-tool-neon-mcp'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        agent: '53e05c74f31d4534afddc3aff5609449',
        tool: 'ba8a43a9dd034717aa2e24697bd725d3',
        name: 'Query Neon Database via MCP',
        description:
            'STEP 2b (run in parallel with Step 2). Secondary validation. Use projectId: shy-base-71725149 (camelCase, not project_id). Execute SQL: SELECT cost_center, actual_amount_usd, baseline_amount_usd, variance, variance_pct FROM "VARIANCE_BASELINE_V" WHERE cost_center = \'{{cost_center}}\' LIMIT 1.',
        active: 'true',
        execution_mode: 'autopilot',
        display_output: 'true',
        display_mode: 'inline',
        max_auto_executions: '10',
        output_transformation_strategy: 'none',
        requires_widget_transformation: 'true',
        tool_attributes: JSON.stringify({
            tool: {
                name: 'run_sql',
                description:
                    '\n    <use_case>\n      Use this tool to execute a single SQL statement against a Neon database.\n    </use_case>\n\n    <important_notes>\n      If you have a temporary branch from a prior step, you MUST:\n      1. Pass the branch ID to this tool unless explicitly told otherwise\n      2. Tell the user that you are using the temporary branch with ID [branch_id]\n    </important_notes>',
            },
        }),
        inputs: JSON.stringify([
            {
                name: 'sql',
                label: 'sql',
                type: 'string',
                originalType: 'string',
                isAiaSupportedType: true,
                mandatory: true,
                description: 'The SQL query to execute',
                defaultValue: null,
            },
            {
                name: 'projectId',
                label: 'projectId',
                type: 'string',
                originalType: 'string',
                isAiaSupportedType: true,
                mandatory: true,
                description: 'The ID of the project to execute the query against',
                defaultValue: null,
            },
            {
                name: 'branchId',
                label: 'branchId',
                type: 'string',
                originalType: 'string',
                isAiaSupportedType: true,
                mandatory: false,
                description:
                    'An optional ID of the branch to execute the query against. If not provided the default branch is used.',
                defaultValue: null,
            },
            {
                name: 'databaseName',
                label: 'databaseName',
                type: 'string',
                originalType: 'string',
                isAiaSupportedType: true,
                mandatory: false,
                description:
                    'The name of the database. If not provided, the default neondb or first available database is used.',
                defaultValue: null,
            },
        ]),
    },
})
