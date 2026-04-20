import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// =====================================================
// AIS Datasources (Indexed Sources) and Search Sources
// These must exist for the search pipelines to function.
// After install, query for platform-assigned sys_ids
// and update field attribute / M2M references.
// =====================================================

// === CC Budget History ===
export const ccBudgetDatasource = Record({
    $id: Now.ID['fv-cc-budget-datasource-v2'],
    table: 'ais_datasource',
    data: {
        name: 'Khepri CC Budget History Indexed Source',
        source: 'x_snc_khepri_cc_budget_history',
        type: 'internal',
        active: 'true',
        conflict: 'false',
        embedding_model: 'E5FT',
        force_late_binding: 'false',
    },
})

export const ccBudgetSearchSource = Record({
    $id: Now.ID['fv-cc-budget-search-source-v2'],
    table: 'ais_search_source',
    data: {
        name: 'Khepri CC Budget History Search Source',
        datasource: 'x_snc_khepri_cc_budget_history',
        active: 'true',
    },
})

// === Expense Transactions ===
export const expenseDatasource = Record({
    $id: Now.ID['fv-expense-datasource-v2'],
    table: 'ais_datasource',
    data: {
        name: 'Khepri Expense Transactions Indexed Source',
        source: 'x_snc_khepri_expense_transactions',
        type: 'internal',
        active: 'true',
        conflict: 'false',
        embedding_model: 'E5FT',
        force_late_binding: 'false',
    },
})

export const expenseSearchSource = Record({
    $id: Now.ID['fv-expense-search-source-v2'],
    table: 'ais_search_source',
    data: {
        name: 'Khepri Expense Transactions Search Source',
        datasource: 'x_snc_khepri_expense_transactions',
        active: 'true',
    },
})
// Budget History datasource/source REMOVED — orphan from deleted Budget Analyst agent.
// Only CC Budget History and Expense Transactions are used by FV Khepri.
