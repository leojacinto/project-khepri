# Khepri Agent Playbook

**This file is the operating manual for the AI coding agent building agents in the Khepri application.**

Read this ENTIRE file before writing any code. Every rule exists because the agent failed without it.

Khepri contains the building block objects for creating AI Agents in ServiceNow, assembled from real use cases. The number and variety of objects will increase as more use cases are built with it.

---

## PRE-FLIGHT CHECKLIST (read before every build/install)

1. Every ScriptInclude class used by a tool needs a `ScriptInclude()` Fluent definition with `accessibleFrom: 'public'`
2. Every manual step MUST include a direct instance link to the record
3. Remove RAG/MCP tools from inline agent `tools[]` after every sync
4. Never use `=` characters in `.now.ts` comment separators (sync corrupts them into merge conflict markers)
5. RAG pipeline needs ALL of: datasource + search source + field attributes + semantic index config + snippet config + search app + profile + profile-source M2M + RAG tool + agent-tool M2M with full inputs
6. Post-install for every agent: Define user access + Define data access + set proficiency + configure indexed source field selection in AI Search Admin Console + trigger reindex
7. `.js` files in `src/server/` compile as `sys_module`, NOT `sys_script_include` -- the `ScriptInclude()` Fluent definition is what creates the `sys_script_include` record
8. For multiple agents in one scope (testing only): use `Record()` on `sn_aia_agent` instead of `AiAgent()`. For production agents: one agent per scoped app using `AiAgent()`

---

> **Instance**: `<YOUR_INSTANCE>.service-now.com`
> **Scope**: `x_snc_khepri` (`5097796e2f1883d880e0653bcfa4e35b`)
> **SDK**: Fluent 4.6.0

---

## Table of Contents

1. [How You Behave](#how-you-behave)
2. [Build Agent Procedure](#build-agent-procedure)
3. [Tool Type Decision Matrix](#tool-type-decision-matrix)
4. [AiAgent Inline Tool Rules](#aiagent-inline-tool-rules)
5. [Record() M2M Tool Rules](#record-m2m-tool-rules)
6. [Post-Install Verification](#post-install-verification)
7. [Sync Management](#sync-management)
8. [Error Analysis Protocol](#error-analysis-protocol)
9. [Constraints Reference](#constraints-reference)
10. [Best Practices](#best-practices)

---

## How You Behave

You are an AI coding agent operating through the Now SDK Fluent DSL. You create ServiceNow AI Agents by writing `.now.ts` files and `.js` scripts. Here is how you operate when asked to build an agent:

### Your execution model

```
User request → Read AGENT_PLAYBOOK.md → Read README.md
  → Produce tool map → Get user approval
  → Build tool backing (tables, seed data, ScriptIncludes, pipelines, MCP chains)
  → Build agent (AiAgent + Record M2Ms)
  → Build + Install → Verify all records on instance
  → Error analysis if anything fails → Report results
```

### What you do NOT do

- **Guess.** You read the type definitions, query the instance, and verify.
- **Reinvent.** When cloning from an existing agent, you copy field values verbatim. You do not paraphrase, simplify, or "improve."
- **Assume.** After every install, you query the instance to verify records exist as expected. You never assume the build preserved your intent.
- **Loop.** If debugging fails 3 times on the same issue, you stop and tell the user what needs manual intervention.
- **Destroy.** You never delete a working file to recreate it. You never set `tools: []` on an agent that has inline tools. You never touch files outside the module being debugged.

### What you ALWAYS do

1. **Read this playbook** at the start of every session.
2. **Produce a tool map** before writing any agent code.
3. **Verify after every install** by querying `sn_aia_agent_tool_m2m`, `sn_aia_tool`, and seed data tables.
4. **Wrap tool scripts in try/catch** with `gs.error('[Khepri]')` logging.
5. **Update agent instructions** every time you change a tool.
6. **Use static `Record()` calls** for seed data — one per record, exported, no loops.

---

## Build Agent Procedure

Follow these steps IN ORDER when building a new agent.

### Step 1: Gather requirements

- What does the agent do?
- What tools does it need?
- For each tool: what tables, what data, what logic?
- If cloning an existing agent: query all its fields and tool M2Ms FIRST.

### Step 2: Produce tool map

Present this to the user BEFORE writing any code:

```
Agent: [name]
Tools:
  1. [tool name] - TYPE: script/rag/mcp - WIRING: inline/Record() M2M - BACKING: [ScriptInclude/pipeline/MCP server] - WHY: [one line]
  2. ...

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
```

### Step 3: Build tool backing

**Tables + seed data:**
- One `.now.ts` file per table in `src/fluent/tables/`
- Explicit exported `Record()` calls for each seed row. NO loops. NO arrays.
- Verify cross-table foreign keys (e.g., expense_event.cost_center must exist in cc_budget_history)

**ScriptIncludes (for script tools):**
- Define via `ScriptInclude()` Fluent API in `src/fluent/script-includes/`
- Server-side `.js` file in `src/server/script-includes/`
- Set `accessibleFrom: 'public'` for cross-scope safety

**Search pipelines (for RAG tools):**
- `ais_datasource` → `ais_search_source` → `ais_search_profile` → profile-source M2M
- **CRITICAL: `ais_datasource_semantic_field_m2m`** — one record per field to index. Without these, AIS indexes nothing and search returns empty. Fields: `datasource` (ais_datasource sys_id), `source` (table name), `component_field_name` (column), `semantic_field_name` (`semantic_default`), `type` (`standard`), `order` (10, 20, ...)
- Tag profile description with `[khepri-auto-publish]`
- Create dedicated `sn_aia_tool` (type: rag) per pipeline in `src/fluent/search/khepri-rag-tools.now.ts`
- After install, profiles must be republished to index the new semantic fields. The auto-publish job handles this within 5 minutes.

**MCP chain (for MCP tools):**
- `api_key_credentials` → `http_connection` → `sys_alias` → `sn_mcp_server` → `sn_aia_tool` (type: mcp)
- All in `src/fluent/mcp/`
- API key must be set manually by user after install

### Step 4: Build agent definition

Use `AiAgent()` in `src/fluent/agents/`:

```typescript
AiAgent({
    $id: Now.ID['my-agent'],
    name: 'My Agent',
    description: 'List all tools by name and type here.',
    agentRole: '...',
    recordType: 'custom',
    securityAcl: { $id: Now.ID['my-agent-acl'], type: 'Public' },
    public: true,
    tools: [
        // ONLY script tools go here
        {
            name: 'My Script Tool',
            type: 'script',
            recordType: 'custom',
            script: Now.include('./my-tool-script.js'),
            inputs: [
                { name: 'param1', description: 'What this is', mandatory: true },
            ],
            description: 'STEP 1. What this tool does and what it returns.',
            displayOutput: true,
            executionMode: 'autopilot',
            maxAutoExecutions: 10,
            outputTransformationStrategy: 'none',
        },
    ],
    triggerConfig: [],
    versionDetails: [{
        name: 'v1',
        number: 1,
        state: 'published',
        instructions: 'STEP 1: Run "Tool A" with input X...\nSTEP 2: Run "Tool B"...',
    }],
})
```

### Step 5: Wire RAG/MCP tools via Record() M2Ms

In a separate file (e.g., `fv-search-pipelines.now.ts`):

```typescript
Record({
    $id: Now.ID['my-rag-tool-m2m'],
    table: 'sn_aia_agent_tool_m2m',
    data: {
        agent: '<agent_sys_id>',       // hardcoded after first install
        tool: '<rag_tool_sys_id>',     // hardcoded after first install
        name: 'Search for Data',
        description: 'STEP 2. What to search and why.',
        active: 'true',
        execution_mode: 'autopilot',
        display_output: 'true',
        max_auto_executions: '10',
        output_transformation_strategy: 'custom',
        inputs: JSON.stringify([...]),  // search config
    },
})
```

### Step 6: Build, install, verify

1. `build` → fix any errors
2. `install` → note new sys_ids in output
3. Run [Post-Install Verification](#post-install-verification)
4. If first install (no hardcoded sys_ids yet): query for sys_ids, update Fluent files, rebuild + reinstall
5. **Configure agent security controls manually** — open the agent record on the instance → Define security controls → set **Define user access** and **Define data access**. These are NOT set by the AiAgent API. Always provide the user with a direct link: `https://<instance>/sn_aia_agent.do?sys_id=<agent_sys_id>`

### Step 7: Tool script template

Every tool script MUST use the **IIFE (Immediately Invoked Function Expression) pattern**. This is the ONLY pattern that works. The sn_aia runtime does NOT expose a global `outputs` object — `outputs` is not defined and will crash.

**Correct pattern** (IIFE — return value):
```javascript
(function(inputs) {
    try {
        var helper = new MyScriptInclude();
        var result = helper.doWork(inputs.param1 || '');
        return result;
    } catch (e) {
        gs.error('[Khepri] My Tool error: ' + e.message);
        return JSON.stringify({
            success: false,
            error: 'Script execution failed: ' + e.message,
            inputs: { param1: inputs.param1 || '(none)' },
            hint: 'Check syslog_app_scope for [Khepri] prefix'
        });
    }
})(inputs);
```

**Wrong pattern** (outputs — crashes with `"outputs" is not defined`):
```javascript
// ❌ DO NOT USE - outputs is not defined in sn_aia_tool script context
var result = helper.doWork(inputs.param1);
outputs.result = result;
```

The try/catch is NOT optional. Without it, the sn_aia runtime swallows the error and returns the useless generic "Sorry, there was a problem on my side" message.

---

## Tool Type Decision Matrix

| Tool type | Where defined | Wiring | inputs | Works inline? | Notes |
|-----------|--------------|--------|--------|---------------|-------|
| **script** | AiAgent `tools[]` | Inline (auto-creates M2M) | `inputs: ToolInputField[]` on inline definition | ✅ YES | Only type that works inline. MUST define `inputs` or agent passes empty Action Inputs. |
| **rag** | `Record()` on `sn_aia_tool` | `Record()` on `sn_aia_agent_tool_m2m` | JSON in M2M `inputs` field (search_profile, sources, fields) | ❌ Creates empty shell | One dedicated rag tool per search pipeline. |
| **mcp** | `Record()` on `sn_aia_tool` | `Record()` on `sn_aia_agent_tool_m2m` | JSON in M2M `inputs` field + `tool_attributes` | ❌ Creates empty shell | `target_document` → `sn_mcp_server` sys_id. |
| **subflow** | Manual in Flow Designer | `Record()` on `sn_aia_agent_tool_m2m` | Defined in subflow | N/A | Fluent `Flow()` creates triggered flows, not callable subflows. Manual conversion required. |
| **crud** | AiAgent `tools[]` | Inline | `inputs: ToolInputType` (operationName, table, inputFields) | ✅ YES | For simple single-table CRUD. |

### What happens when you inline RAG/MCP/subflow

The AiAgent plugin creates an `sn_aia_tool` record with:
- `type: null`
- `target_document: null`
- `record_type: template`
- `input_schema: []`

It looks like a tool but does nothing. The agent will try to call it and fail silently.

---

## AiAgent Inline Tool Rules

1. **Only `script` and `crud` types.** Everything else creates empty shells.
2. **Always define `inputs: ToolInputField[]`.** Without it, `input_schema` = `[]`, agent passes `Action Inputs: {}`, script reads `undefined`.
3. **Never set `tools: []`.** The install treats this as "delete all inline M2Ms." Your tools vanish.
4. **The sync adds tools back.** After every sync, the instance state is pulled into your `.now.ts` file. RAG/MCP tools get added inline. You MUST remove them before building or you get build errors (`targetDocument does not exist`).
5. **The sync also adds `runAsUser: ''`.** Remove this too if it causes issues.

---

## Record() M2M Tool Rules

1. **Use for RAG, MCP, subflow tools.** These need `target_document`, `tool_attributes`, and complex `inputs` JSON that inline tools cannot express.
2. **Hardcode sys_ids.** `Now.ID` does not resolve in `Record()` data fields. Use the two-pass pattern: install once to get platform-assigned sys_ids, then update the file.
3. **One tool per pipeline.** The build validator enforces uniqueness on `(agent, tool)` in `sn_aia_agent_tool_m2m`. Two M2Ms pointing to the same tool = build failure.
4. **RAG M2M inputs template:**
```json
[
    {"name": "search_type", "value": "semantic", "description": "Search type"},
    {"name": "query", "description": "search query for X"},
    {"name": "search_profile", "value": "<profile_name>", "label": "<Profile Label>", "description": "Search profile"},
    {"name": "sources", "label": ["<Source Label>"], "value": ["<table_name>"], "description": "Search sources"},
    {"name": "fields", "label": ["Field [table]"], "value": ["table.field"], "description": "Fields to be returned"},
    {"name": "document_match_threshold", "value": 0, "description": "Document matching threshold"}
]
```

---

## Post-Install Verification

Run these queries after EVERY install. Do not skip.

### 1. All tool M2Ms present

```
Table: sn_aia_agent_tool_m2m
Query: agent=<agent_sys_id>^active=1
Verify: Count matches expected tools. Each has correct name, description, tool reference.
```

### 2. Tool records configured correctly

```
Table: sn_aia_tool
Query: sys_id=<tool1>^ORsys_id=<tool2>^OR...
Verify:
  - Script tools: type=script, script is populated, input_schema has entries
  - RAG tools: type=rag, target_document points to sys_one_extend_capability
  - MCP tools: type=mcp, target_document points to sn_mcp_server
  - NO tool has type=null (empty shell)
```

### 3. M2M inputs populated

```
For each M2M record, check the inputs field:
  - Script tool M2Ms: inputs should have name/description/mandatory for each parameter
  - RAG tool M2Ms: inputs should have search_profile, sources, fields, query
  - MCP tool M2Ms: inputs should have the MCP operation parameters + tool_attributes
```

### 4. Seed data exists

```
Query each table used by agent tools.
Verify record count matches expected.
Verify foreign key alignment across tables.
```

### 5. No duplicate records

```
For each AIS table (ais_datasource, ais_datasource_field_attribute, ais_datasource_attribute, ais_search_source, ais_search_profile, sys_search_context_config (Search Application),
ais_search_profile_ais_search_source_m2m

#### Complete RAG Search Pipeline Checklist (from scratch)

When building a RAG search pipeline, create ALL of the following records per pipeline. Missing any one causes silent failure.

| # | Table | Record | Key Fields |
|---|-------|--------|------------|
| 1 | `ais_datasource` | Indexed Source | `name`, `source` (table name), `type: internal`, `active: true` |
| 2 | `ais_datasource_field_attribute` | Field role: title | `datasource` (sys_id), `source` (table name), `field` (column), `attribute: f734a634c7320010d1cfd9795cc26094`, `value: title` |
| 3 | `ais_datasource_field_attribute` | Field role: text | Same as above but `value: text` for body/content fields |
| 4 | `ais_datasource_attribute` | Datasource setting | `datasource` (sys_id), `source` (table name), `attribute: 2dd8f14753320010ffaaddeeff7b1293`, `value: false` |
| 5 | `ais_search_source` | Search Source | `name`, `datasource` (table name, NOT sys_id), `active: true` |
| 6 | `ais_search_profile` | Search Profile | `name` (scope-prefixed), `label`, `active: true`, `state: PUBLISHED`, `qna_model_id: bert-qa-model-1.1.6` |
| 7 | `sys_search_context_config` | **Search Application** | `name`, `search_engine: ai_search`, `search_profile` (sys_id), `document_match_threshold: 0.65`, `document_match_count: 3`, `enable_exact_match: true`, `spell_check: true`, `genius_results_limit: 1`, `search_results_limit: 10`, `suggestions_to_show_limit: 10`, `attachment_limit: 5`, `collapse_attachment: true`, `show_tab_counts: true`, `enable_semantic_search: false`, `enable_hybrid_search: false`, `hit_highlighting: false`, `show_disabled_facets: false`, `filter_genius_results_by_search_source: false`, `log_signals_server_side: false` |
| 8 | `ais_semantic_snippetization_configuration` | Snippet config | `snippet_mode: PASSAGE`, `limited_by: WORDS`, `limit: 250`, `max_total_words: 500`, `overlap_sentences: 5` |
| 9 | `ais_semantic_index_configuration` | Semantic index | `semantic_field_name` (unique, e.g. `KhepriCostCenterBudgetHistory`), `datasource` (table name), `active: true`, `embedding_models: c153d0f2432302104611495d9bb8f2ec`, `semantic_snippetization_configuration` (sys_id — requires two-pass) |
| 10 | `ais_search_profile_ais_search_source_m2m` | Profile-Source link | `profile` (sys_id), `search_source` (sys_id) |
| 11 | `sn_aia_tool` | RAG tool | `type: rag`, `record_type: custom`, `target_document: sys_one_extend_capability` |
| 12 | `sn_aia_agent_tool_m2m` | Agent-Tool wiring | `agent` (sys_id), `tool` (sys_id), with `inputs` JSON containing `search_profile`, `sources`, `fields`, `search_type: semantic`, `document_match_threshold: 0`, **and `semantic_index_names`** (value must match `semantic_field_name` on the index config) |

**DO NOT use**: `ais_datasource_semantic_field_m2m` (deprecated, does not trigger indexing).

**After install**: User must manually trigger indexing from AI Search Admin Console → datasource → Index Now. Verify via `ais_ingest_table_stats`.

#### MCP Connection Checklist (from scratch)

#### Cross-Scope Privilege Procedure for Script Tools

When a ScriptInclude creates/reads/updates records on a table NOT in your app scope, GlideRecord operations **fail silently** — no error, no exception, just no record. Always audit before writing code.

**Procedure:**
1. List every `GlideRecord('<table_name>')` call in the ScriptInclude
2. For each table, check if it's in your scope (starts with your scope prefix, e.g. `x_snc_khepri_`)
3. For cross-scope tables: query `sys_db_object` → `name=<table>` → get `sys_scope` (this is the sys_id)
4. Use the `sys_scope` sys_id directly as `targetScope` — do NOT use the scope name string
5. Declare `CrossScopePrivilege` for each operation needed (`create`, `read`, `write`):
```typescript
CrossScopePrivilege({
    $id: Now.ID['csp-<table>-<operation>'],
    status: 'allowed',
    operation: '<create|read|write>',
    targetName: '<table_name>',
    targetScope: '<sys_scope sys_id from step 3>',
    targetType: 'sys_db_object',
})
```
6. **CRITICAL**: `targetScope` must be the scope's **sys_id**, NOT the scope name string. Scope name strings (e.g. `sn_spend_sdc`) do NOT resolve. The FV app uses sys_ids and it works. Khepri used scope name and it silently failed.

**Known cross-scope tables in Khepri:**

| Table | Scope | Operations | Why |
|-------|-------|-----------|-----|
| `sn_aia_agent` | `sn_aia` | create, read, write | Agent creation |
| `sn_aia_tool` | `sn_aia` | create, read, write | Tool records |
| `sn_aia_agent_tool_m2m` | `sn_aia` | create, read, write | Agent-tool wiring |
| `sn_aia_agent_config` | `sn_aia` | create, read, write | Agent config |
| `sn_spend_sdc_service_request` | `sn_spend_sdc` | create | Finance Case creation from BVA script tool |
| AIS tables (`ais_*`) | `global` / `sn_ais` | varies | Search pipeline — check `ais-privileges.now.ts` |

#### MCP Connection Checklist (from scratch), sys_script_include):
  Query: sys_scope=<khepri_scope>
  Verify: Exactly 1 record per logical entity. No inactive/conflict duplicates.
  If duplicates found: delete the newer one (higher sys_created_on) manually.
```

This is critical because `Record()` with `Now.ID` creates new records on every install instead of updating existing ones. Duplicates cause:
- Ambiguous ScriptInclude resolution (tool calls wrong class)
- Wasted search index resources
- Confusing admin UI with inactive copies

**Prevention**: After first install, hardcode platform-assigned sys_ids into Record() calls.

### 6. Agent instructions match tools

```
Table: sn_aia_agent
Query: sys_id=<agent_sys_id>
Read the versionDetails instructions.
Verify every tool is listed with its step number.
```

---

## Sync Management

The Fluent sync pulls instance state back into your `.now.ts` files. It will:

1. **Add RAG/MCP tools to the inline `tools` array** — causing build errors (`targetDocument does not exist on GenericToolDetails`).
2. **Add `runAsUser: ''`** — harmless but clutters the file.
3. **Reformat code** — cosmetic, ignore.
4. **Change `Now.include()` paths** — verify they still point to correct `.js` files.

### How to handle sync

After every sync that triggers before install:
1. Read the synced agent file
2. Remove any RAG/MCP/subflow tools from the inline `tools` array
3. Remove `runAsUser` if present
4. Verify script tools still have their `inputs` arrays
5. Build and install

**The sync is your enemy on agent files.** Always read before build after a sync.

---

## Error Analysis Protocol

When an agent tool fails with "Sorry, there was a problem on my side":

### Step 1: Check tool script has try/catch

If no try/catch with `gs.error('[Khepri]')`, add it first, reinstall, and test again. Without it, the error is invisible.

### Step 2: Search syslog_app_scope

```
Table: syslog_app_scope
Query: messageLIKE[Khepri]^ORDERBYDESCsys_created_on
```

NOTE: `syslog` requires cross-scope privilege. Use `syslog_app_scope` instead.

### Step 3: Check GenAI response logs

```
Table: syslog_app_scope
Query: messageLIKEGenAILogger^messageLIKE<tool_name>^ORDERBYDESCsys_created_on
```

In the response payload, verify:
- `Action Inputs` — did the agent pass the expected values?
- `Observation` — empty means the tool crashed before returning
- `type` — matches the tool's actual type (script/rag/mcp)

### Step 4: Verify M2M inputs

```
Table: sn_aia_agent_tool_m2m
Query: agent=<agent_sys_id>^active=1
```

Check `inputs` field on each M2M. Empty `[]` for script tools = agent passes nothing.

### Step 5: Verify ScriptInclude

```
Table: sys_script_include
Query: name=<ClassName>^sys_scope=5097796e2f1883d880e0653bcfa4e35b
```

Check for:
- **Duplicates** — multiple records with same name cause ambiguity. Delete extras on instance.
- **access** — must be `public`
- **active** — must be `1`

### Step 6: Cross-scope resolution

If `new ClassName()` fails, try `new x_snc_khepri.ClassName()`. The tool script may execute in sn_aia scope context.

### Step 7: Verify seed data

Query the tables. Ensure lookup values actually exist.

### Common failure modes

| # | Failure | Symptom | Fix |
|---|---------|---------|-----|
| 1 | No try/catch | Generic "Sorry" error, nothing in logs | Add IIFE try/catch + gs.error to tool script |
| 2 | Using `outputs` instead of `return` | `"outputs" is not defined` in logs | Use IIFE pattern: `(function(inputs) { return result; })(inputs);` |
| 3 | Empty inputs | Agent passes `Action Inputs: {}` | Add `inputs: ToolInputField[]` to inline tool |
| 4 | Cross-scope ScriptInclude | `is not defined` or `is not a constructor` | Use `new x_snc_khepri.ClassName()` |
| 5 | Duplicate ScriptIncludes | Ambiguous resolution | Delete duplicates on instance |
| 6 | No seed data | Tool returns "not found" | Add matching records |
| 7 | Empty shell tool | `type: null`, no config | RAG/MCP was inline → use Record() M2Ms |
| 8 | M2M deleted | `tools: []` removed inline M2Ms | Never set empty tools array |
| 9 | Sync added bad tools | Build error on `targetDocument` | Remove RAG/MCP from inline tools after sync |

---

## Constraints Reference

Every constraint below was discovered through failure. Do not rediscover them.

| Constraint | Cause | Workaround |
|-----------|-------|------------|
| `Now.ID` in Record data fields stores literal strings | Not resolved at install time | Two-pass: install → get sys_ids → hardcode → reinstall |
| `password2` fields cannot be set | Platform encryption | Create shell; user sets key manually |
| Business rules skipped during install | `setWorkflow(false)` | Use scheduled job for post-install logic |
| Duplicate (agent, tool) pairs rejected | Uniqueness constraint | One `sn_aia_tool` per search pipeline |
| Record API booleans crash sync | `"1"`/`"0"` vs `true`/`false` | Use `AiAgent()` for agents; `"true"`/`"false"` strings for Record API |
| Inline RAG/MCP = empty shells | AiAgent only creates script/crud tools correctly | Use Record() M2Ms for RAG/MCP/subflow |
| Inline script tools need explicit `inputs` | Without it, `input_schema: []` → empty Action Inputs | Add `inputs: ToolInputField[]` |
| `tools: []` deletes M2Ms | Install removes all inline-created M2Ms | Never set empty array; keep at least script tools |
| `outputs` is not defined in tool scripts | sn_aia_tool script context has no global `outputs` object | Use IIFE pattern: `(function(inputs) { return result; })(inputs);` — return the value, don't assign to outputs |
| `ais_datasource_semantic_field_m2m` is DEPRECATED | Does NOT trigger indexing. Zero records in `ais_ingest_table_stats` confirmed this. The working FV app does not use this table at all. | Use `ais_datasource_field_attribute` instead: `datasource` (sys_id), `source` (table name), `field` (column name), `attribute` (`f734a634c7320010d1cfd9795cc26094` = content_type), `value` (`title` for primary fields, `text` for body/content fields). Also create `ais_datasource_attribute` with attribute `2dd8f14753320010ffaaddeeff7b1293`, value `false`. After install, user must manually trigger indexing from AI Search Admin Console. |
| `Record()` with `Now.ID` creates duplicates on every install | `Now.ID` generates a hash that doesn't match the platform-assigned sys_id, so each install creates a new record | After first install, query for the platform sys_ids and hardcode them into the Record() calls. Verify record counts after each install. Delete inactive/conflict duplicates manually. |
| Auto-publish job skipped already-published profiles | Original job filtered `state != PUBLISHED`, so semantic fields added after publish were never indexed | Removed the state filter — job now always re-publishes tagged profiles. `publishProfile()` is idempotent and forces re-index. |
| Redundant cross-scope privileges fail build | Tables with open access don't need privileges | Only declare for actually restricted tables |
| Fluent `Flow()` ≠ callable subflow | `Flow()` requires trigger; agents need string inputs | Manual conversion in Flow Designer |
| Agent subflow tools: "Unsupported data type" | Trigger passes record object, agent passes strings | Accept string inputs + lookUpRecord inside subflow |
| `proficiency` not in AiAgent API | Type definition omits it | Set manually on instance |
| Agent security controls not in AiAgent API | The AiAgent `securityAcl` property only sets the ACL type (Public / Any authenticated user / Specific role). The full security wizard — **Define user access** and **Define data access** — is not exposed through the Fluent API. | After every install, open the agent record on the instance → Define security controls → configure user access and data access. The agent MUST include a direct link: `https://<instance>/sn_aia_agent.do?sys_id=<agent_sys_id>`. This is a mandatory manual step for every agent. |
| ScriptIncludes need explicit `ScriptInclude()` Fluent definitions | `.js` files under `src/server/script-includes/` compile as `sys_module` records, NOT as `sys_script_include` records. Agent tool scripts that call `new ClassName()` will fail with `"ClassName" is not defined` if there is no `ScriptInclude()` definition. | For every ScriptInclude class used by agent tools: create a `ScriptInclude()` definition in a `.now.ts` file with `script: Now.include('../../server/script-includes/filename.js')` and `accessibleFrom: 'public'`. The `name` must match the `Class.create()` variable name and the `type` property in the prototype. |
| String concatenation in properties | `'a' + 'b'` fails Fluent parser | Use `\n` in single string |
| `instructions` not directly on AiAgent | Uses `versionDetails` | `versionDetails: [{ instructions: '...' }]` |
| Static `Record()` calls only | `forEach` loops silently drop seed data | One exported Record() per row |
| Sync overwrites agent files | Instance state pulled into .now.ts | Remove RAG/MCP tools from inline array after sync |
| `AiAgent()` limited to one per scope | Fluent build validator rejects two `AiAgent()` definitions in the same scope. Inline tool names and `.js` script references conflict. | **Production pattern**: one agent per scoped app using `AiAgent()`. Each new agent gets a new scoped app (`create_new_servicenow_app`) with a copy of this playbook. Khepri stays as the reference implementation. **Testing pattern only**: use `Record()` on `sn_aia_agent` + `sn_aia_tool` + `sn_aia_agent_tool_m2m` to create additional agents in the same scope. This bypasses the Fluent build validator but requires two-pass sys_id wiring for everything. |

---

## Best Practices

### Agent creation checklist

- [ ] Tool map produced and approved
- [ ] All backing tables created with seed data
- [ ] Cross-table foreign keys verified
- [ ] ScriptIncludes created with `accessibleFrom: 'public'`
- [ ] Tool scripts wrapped in try/catch with `gs.error('[Khepri]')`
- [ ] Script tool `inputs` defined with `ToolInputField[]`
- [ ] RAG pipelines created with `[khepri-auto-publish]` tag
- [ ] MCP chain created (credential → connection → alias → server → tool)
- [ ] AiAgent definition with only script tools inline
- [ ] Record() M2Ms for RAG/MCP tools with full inputs JSON
- [ ] Agent `description` lists all tools by name and type
- [ ] Agent `versionDetails.instructions` has step-by-step tool sequence
- [ ] Build succeeds
- [ ] Install succeeds
- [ ] Post-install verification passes (all 5 checks)
- [ ] Agent tested in Now Assist — all tools fire

### Post-install manual steps (every agent, every install)

- [ ] **Define user access** — open agent record → Define security controls → Define user access. Set who can invoke the agent. Direct link: `https://<instance>/sn_aia_agent.do?sys_id=<agent_sys_id>`
- [ ] **Define data access** — same agent record → Define security controls → Define data access. Set what data the agent can access.
- [ ] **Set proficiency** — not in AiAgent API. Set manually on the agent record.
- [ ] **Configure indexed sources for semantic search** — the Fluent Record() API creates `ais_datasource`, `ais_datasource_field_attribute`, and `ais_semantic_index_configuration` records, but the AI Search Admin Console requires a manual step to select which fields to include in the semantic index. For each indexed source: open in AI Search Admin Console → select fields for semantic indexing (title/text roles) → Save → Index Now. Without this step, RAG tools will return no results. Always provide direct links to each `ais_datasource` record and a table listing which fields to pick and their roles (title vs text).

### When cloning from an existing agent

1. Query the original agent: `sn_aia_agent.do?sys_id=<id>`
2. Query all tool M2Ms: `sn_aia_agent_tool_m2m` where `agent=<id>`
3. Query each tool: `sn_aia_tool.do?sys_id=<tool_id>`
4. Copy ALL field values verbatim
5. Adapt ONLY scope-specific references (table names, sys_ids)
6. Do NOT paraphrase descriptions, instructions, or tool attributes

### File organization

```
src/fluent/
  agents/           AiAgent definitions + tool .js scripts
  cross-scope/      Cross-scope privilege declarations
  mcp/              MCP connection chain records
  script-includes/  ScriptInclude Fluent definitions
  search/           AIS pipelines + RAG tool M2Ms
  tables/           Table definitions + seed data
src/server/
  script-includes/  ScriptInclude .js implementations
  scheduled-scripts/ Scheduled job scripts
```

### Naming conventions

- Agent files: `<agent-name>.now.ts`
- Tool scripts: `sn_aia_tool_<hash>.js` (matches platform convention)
- ScriptIncludes: `Khepri<PascalCaseName>`
- Tables: `x_snc_khepri_<snake_case_name>`
- Search profiles: `x_snc_khepri_<table>_search_profile`
- Now.ID keys: `<kebab-case-descriptive-name>`
