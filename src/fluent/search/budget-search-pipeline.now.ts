import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// ---
// KHEPRI SEARCH INDEX TEST
// Full AIS pipeline: datasource -> search source ->
// search profile -> profile-source M2M
// Plus a Budget Search Agent wired to the RAG Retriever
// ---
export const khepriBudgetSearchProfile = Record({
    $id: Now.ID['khepri-budget-search-profile'],
    table: 'ais_search_profile',
    data: {
        name: 'x_snc_khepri_budget_history_search_profile',
        label: 'Khepri Budget History Search Profile',
        description: '[khepri-auto-publish] Budget history search profile for cost center variance analysis.',
        active: 'true',
        state: 'PUBLISHED',
        exclude_from_evaluation: 'false',
        publish_id: '38519aaf-6e0c-4618-8e83-9eabd9f525a2',
        qna_model_id: 'bert-qa-model-1.1.6',
    },
})
// Tool M2M and agent config are handled by AiAgent() in forecast-variance-khepri.now.ts
