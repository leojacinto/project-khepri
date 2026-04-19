import '@servicenow/sdk/global'
import { CrossScopePrivilege } from '@servicenow/sdk/core'

// =====================================================
// Cross-scope privilege for sn_spend_sdc_service_request
// (Finance Case table — scope: sn_spend_sdc)
// Required by KhepriBudgetVarianceAnalysis ScriptInclude
// to create Finance Cases after variance analysis
// =====================================================
CrossScopePrivilege({
    $id: Now.ID['csp-finance-case-create'],
    status: 'allowed',
    operation: 'create',
    targetName: 'sn_spend_sdc_service_request',
    targetScope: 'd8a34403534f101077b6ddeeff7b12a5',
    targetType: 'sys_db_object',
})
