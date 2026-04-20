// @ts-nocheck
/*
KHEPRI AGENT PLAYBOOK - FIELD GUIDE FOR BUILDING AI AGENTS

HOW TO USE: From any Build Agent conversation, search for this playbook:
  keyword_search("Khepri Agent Playbook", contentMode: "full")
Then follow the Build Agent Procedure to create your agent.

This playbook deploys with the Khepri app. Install Khepri once on your
instance and every Build Agent conversation can access this field guide.

PRE-FLIGHT CHECKLIST (read before every build/install)

1. Every ScriptInclude class used by a tool needs a ScriptInclude() Fluent definition with accessibleFrom: 'public'
2. Every manual step MUST include a direct instance link to the record
3. Remove RAG/MCP tools from inline agent tools[] after every sync
4. Never use = characters in .now.ts comment separators (sync corrupts them into merge conflict markers)
5. RAG pipeline needs ALL of: datasource + search source + field attributes + semantic index config + snippet config + search app + profile + profile-source M2M + RAG tool + agent-tool M2M with full inputs
6. Post-install for every agent: Define user access + Define data access + set proficiency + configure indexed source field selection in AI Search Admin Console + trigger reindex
7. .js files in src/server/ compile as sys_module, NOT sys_script_include -- the ScriptInclude() Fluent definition is what creates the sys_script_include record
8. For multiple agents in one scope (testing only): use Record() on sn_aia_agent instead of AiAgent(). For production agents: one agent per scoped app using AiAgent()

BUILD AGENT PROCEDURE

Step 1: Gather requirements
- What does the agent do?
- What tools does it need?
- For each tool: what tables, what data, what logic?
- If cloning an existing agent: query all its fields and tool M2Ms FIRST.

Step 2: Produce tool map
Present this to the user BEFORE writing any code:
  Agent: [name]
  Tools:
    1. [tool name] - TYPE: script/rag/mcp - WIRING: inline/Record() M2M - BACKING: [ScriptInclude/pipeline/MCP server] - WHY: [one line]
  Build order:
    1. Tables + seed data
    2. ScriptIncludes (for script tools)
    3. Search pipelines (for RAG tools)
    4. MCP chain (for MCP tools)
    5. RAG tool records (sn_aia_tool type: rag)
    6. MCP tool records (sn_aia_tool type: mcp)
    7. AiAgent definition (with script tools inline)
    8. Record() M2Ms (for RAG/MCP tools)
    9. Build + Install + Verify

Step 3: Build tool backing

Tables + seed data:
- One .now.ts file per table in src/fluent/tables/
- Explicit exported Record() calls for each seed row. NO loops. NO arrays.
- Verify cross-table foreign keys

ScriptIncludes (for script tools):
- Define via ScriptInclude() Fluent API in src/fluent/script-includes/
- Server-side .js file in src/server/script-includes/
- Set accessibleFrom: 'public' for cross-scope safety

Search pipelines (for RAG tools) - COMPLETE CHECKLIST:
  1. ais_datasource - Indexed Source (name, source=table_name, type=internal, active=true)
  2. ais_datasource_field_attribute - Field role: title (datasource=sys_id, field=column, attribute=f734a634c7320010d1cfd9795cc26094, value=title)
  3. ais_datasource_field_attribute - Field role: text (same but value=text for body fields)
  4. ais_datasource_attribute - Datasource setting (attribute=2dd8f14753320010ffaaddeeff7b1293, value=false)
  5. ais_search_source - Search Source (datasource=table_name NOT sys_id, active=true)
  6. ais_search_profile - Search Profile (name=scope-prefixed, state=PUBLISHED, qna_model_id=bert-qa-model-1.1.6)
  7. sys_search_context_config - Search Application (search_engine=ai_search, search_profile=sys_id)
  8. ais_semantic_snippetization_configuration - Snippet config (PASSAGE, WORDS, limit=250)
  9. ais_semantic_index_configuration - Semantic index (unique semantic_field_name, embedding_models=c153d0f2432302104611495d9bb8f2ec)
  10. ais_search_profile_ais_search_source_m2m - Profile-Source link
  11. sn_aia_tool - RAG tool (type=rag, target_document=5345d14277e81210e9c41345ba5a9933)
  12. sn_aia_agent_tool_m2m - Agent-Tool wiring with inputs JSON including semantic_index_names
  DO NOT use ais_datasource_semantic_field_m2m (deprecated).

MCP chain (for MCP tools):
- api_key_credentials -> http_connection -> sys_alias -> sn_mcp_server -> sn_aia_tool (type: mcp)
- API key must be set manually by user after install

Step 4: Build agent definition
Use AiAgent() in src/fluent/agents/. Only script tools go inline.
RAG/MCP/subflow tools create empty shells if inlined -- use Record() M2Ms instead.

Step 5: Wire RAG/MCP tools via Record() M2Ms
Use Record() on sn_aia_agent_tool_m2m. Hardcode sys_ids (two-pass pattern).

Step 6: Build, install, verify
After install: Define user access + Define data access + set proficiency + configure indexed sources + reindex

TOOL TYPE DECISION MATRIX

script - AiAgent tools[] inline - ONLY type that works inline
rag - Record() on sn_aia_tool + sn_aia_agent_tool_m2m - one per search pipeline
mcp - Record() on sn_aia_tool + sn_aia_agent_tool_m2m - target_document = sn_mcp_server sys_id
subflow - Manual in Flow Designer + Record() M2M
crud - AiAgent tools[] inline - for simple single-table CRUD

TOOL SCRIPT TEMPLATE (IIFE pattern - ONLY pattern that works)

(function(inputs) {
    try {
        var helper = new MyScriptInclude();
        var result = helper.doWork(inputs.param1 || '');
        return result;
    } catch (e) {
        gs.error('[Khepri] My Tool error: ' + e.message);
        return JSON.stringify({ success: false, error: e.message });
    }
})(inputs);

NEVER use outputs.result = ... (outputs is not defined in sn_aia_tool context)

KEY CONSTRAINTS (discovered through failure)

- Now.ID in Record data fields stores literal strings, not resolved -- use two-pass
- password2 fields cannot be set -- user sets manually
- Inline RAG/MCP = empty shells -- use Record() M2Ms
- tools: [] deletes all M2Ms -- never set empty array
- Sync adds RAG/MCP tools back inline -- remove before build
- .js files compile as sys_module not sys_script_include -- need ScriptInclude() definition
- AiAgent() limited to one per scope -- one agent per scoped app for production
- Record() with Now.ID creates duplicates -- hardcode sys_ids after first install
- targetScope in CrossScopePrivilege must be sys_id, not scope name string
- Never use = characters in .now.ts comment separators (sync corrupts to merge conflict markers)

POST-INSTALL MANUAL STEPS (every agent, every install)

1. Define user access on agent record
2. Define data access on agent record
3. Set proficiency on agent record
4. Configure indexed source field selection in AI Search Admin Console
5. Trigger reindex for each datasource
6. Set MCP API keys via Connections and Credentials (if MCP tools used)

For the complete playbook with all code examples, error analysis protocol,
and constraints reference, see the AGENT_PLAYBOOK.md file in the Khepri app
workspace or query: keyword_search("Khepri Agent Playbook", contentMode: "full")
*/
var KhepriAgentPlaybook = Class.create();
KhepriAgentPlaybook.prototype = {
    initialize: function() {},
    type: 'KhepriAgentPlaybook'
};
