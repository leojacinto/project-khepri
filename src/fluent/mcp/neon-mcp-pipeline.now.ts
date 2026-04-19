import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// =====================================================
// KHEPRI MCP CONNECTION — NEON POSTGRES
// Full MCP pipeline: credential → connection →
// alias → MCP server → AIA tool → agent tool M2M
//
// API KEY AUTH ONLY — no OData.
// The api_key field is password2 (encrypted). Khepri
// creates the record structure but the user MUST set
// the actual API key value manually after install:
//   1. Navigate to Credentials > API Key Credentials
//   2. Find "Khepri Neon MCP" credential
//   3. Enter the API key value
//
// RECORD SYS_IDS (populated after first install):
//   api_key_credentials: 3bb7a63c3af0471c94e51585cb9eb7cb
//   sys_alias:           5bf1b9550b8144bfa210efb530cd5bae
//   http_connection:     eaceb5ba44644d13b980f7fb734fd98e
//   sn_mcp_server:       547fe99656094b12b7b7d091b542802e
//   sn_aia_tool:         f8fe5a193cea479fbd3017cab7f30214
//   agent_tool_m2m:      8bcd2b763db64964a74e9e6d0104950c
// =====================================================

// =====================================================
// 1. API KEY CREDENTIAL
// =====================================================
export const khepriMcpCredential = Record({
    $id: Now.ID['khepri-mcp-credential'],
    table: 'api_key_credentials',
    data: {
        name: 'Khepri Neon MCP',
        type: 'api_key',
        active: 'true',
        applies_to: 'all',
        lookup_key: 'credential_id',
    },
})

// =====================================================
// 2. CONNECTION ALIAS (sys_alias)
// =====================================================
export const khepriMcpAlias = Record({
    $id: Now.ID['khepri-mcp-alias'],
    table: 'sys_alias',
    data: {
        name: 'Khepri Neon MCP Connection',
        id: 'x_snc_khepri.Khepri_Neon_MCP_Connection',
        type: 'connection',
        connection_type: 'http_connection',
        multiple_connections: 'false',
    },
})

// =====================================================
// 3. HTTP CONNECTION
// Uses hardcoded sys_ids for reference fields
// =====================================================
export const khepriMcpConnection = Record({
    $id: Now.ID['khepri-mcp-connection'],
    table: 'http_connection',
    data: {
        name: 'Khepri Neon MCP Connection',
        host: 'mcp.neon.tech',
        connection_url: 'https://mcp.neon.tech/mcp',
        active: 'true',
        use_mid: 'false',
        mid_selection: 'auto_select',
        connection_retries: '0',
        connection_alias: '5bf1b9550b8144bfa210efb530cd5bae',
        credential: '3bb7a63c3af0471c94e51585cb9eb7cb',
    },
})

// =====================================================
// 4. MCP SERVER
// =====================================================
// =====================================================
// 5. AIA TOOL (MCP type)
// =====================================================
export const khepriMcpTool = Record({
    $id: Now.ID['khepri-mcp-tool'],
    table: 'sn_aia_tool',
    data: {
        name: 'Khepri Neon SQL Query',
        type: 'mcp',
        active: 'true',
        record_type: 'custom',
        target_document: '547fe99656094b12b7b7d091b542802e',
        target_document_table: 'sn_mcp_server',
        description:
            'Execute SQL queries against a Neon Postgres database via MCP. Use this to query budget variance data directly from the source database.',
        input_schema: JSON.stringify([
            {
                name: 'sql',
                description: 'The SQL query to execute',
                mandatory: true,
            },
            {
                name: 'projectId',
                description: 'The ID of the Neon project to execute the query against',
                mandatory: true,
            },
            {
                name: 'branchId',
                description:
                    'An optional ID of the branch to execute the query against. If not provided the default branch is used.',
                mandatory: false,
            },
            {
                name: 'databaseName',
                description:
                    'The name of the database. If not provided, the default neondb or first available database is used.',
                mandatory: false,
            },
        ]),
    },
})

// Agent tool M2M is in fv-khepri-tools.now.ts
