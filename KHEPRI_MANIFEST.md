# KHEPRI_MANIFEST.md
# Khepri Application Manifest & Agent Guardrails
# Last updated: 2026-04-18

## Purpose
This manifest documents the Khepri application architecture, what's been built,
what's proven working, and guardrails for the AI agent (me) to follow during
development. It exists to prevent destructive debugging spirals.

---

## Application Identity
- **Scope**: x_snc_khepri
- **Scope sys_id**: 31ca590e2fdc8f18920fa33fafa4e3fd
- **Instance**: <YOUR_INSTANCE>.service-now.com

---

## What's Built & Working

### Phase 1: Core Agent Infrastructure
| Component | File | Status |
|-----------|------|--------|
| Test Agent (Khepri Ping) | `src/fluent/agents/khepri-test-agent.now.ts` | ✅ Proven |
| Agent scripts | `src/fluent/agents/scripts/*.server.js` | ✅ Proven |
| AIA cross-scope privileges | `src/fluent/cross-scope/aia-privileges.now.ts` | ✅ Proven |

### Phase 2: RAG / AI Search Pipeline
| Component | File | Status |
|-----------|------|--------|
| Budget History table + 18 records | `src/fluent/tables/budget-history.now.ts` | ✅ Proven |
| AIS cross-scope privileges | `src/fluent/cross-scope/ais-privileges.now.ts` | ✅ Proven |
| Full search pipeline (datasource → source → profile → M2M → agent → RAG tool → config) | `src/fluent/search/budget-search-pipeline.now.ts` | ✅ Proven |
| Auto-publish business rule | `src/fluent/search/auto-publish-rule.now.ts` | ✅ Installed (BR skipped by install, but no harm) |
| Auto-publish scheduled job | `src/fluent/search/auto-publish-scheduled.now.ts` | ✅ Proven — publishes tagged profiles every 5 min |
| Auto-publish script | `src/server/scheduled-scripts/auto-publish-profiles.js` | ✅ Proven |

### Key Records on Instance
| Record | Table | sys_id | Link |
|--------|-------|--------|------|
| Khepri Budget Analyst agent | sn_aia_agent | 710520460df942658b4932b93e0f05e6 | [Open](https://<YOUR_INSTANCE>.service-now.com/sn_aia_agent.do?sys_id=710520460df942658b4932b93e0f05e6) |
| Budget History Search Profile | ais_search_profile | 31f1f7e70caa416a92b22ee2218514e2 | [Open](https://<YOUR_INSTANCE>.service-now.com/ais_search_profile.do?sys_id=31f1f7e70caa416a92b22ee2218514e2) |
| Budget History Datasource | ais_datasource | 22aa38ccff9f4e769a56bed322cd953c | [Open](https://<YOUR_INSTANCE>.service-now.com/ais_datasource.do?sys_id=22aa38ccff9f4e769a56bed322cd953c) |
| Budget History Search Source | ais_search_source | 8d3f8e76e0dc454a9ec17bd2c76fa107 | [Open](https://<YOUR_INSTANCE>.service-now.com/ais_search_source.do?sys_id=8d3f8e76e0dc454a9ec17bd2c76fa107) |
| RAG Retriever tool (platform) | sn_aia_tool | 8021ddea2b0d52101d72fb466e91bfd1 | [Open](https://<YOUR_INSTANCE>.service-now.com/sn_aia_tool.do?sys_id=8021ddea2b0d52101d72fb466e91bfd1) |
| Khepri Neon MCP credential | api_key_credentials | 3bb7a63c3af0471c94e51585cb9eb7cb | [⚠️ Set API Key](https://<YOUR_INSTANCE>.service-now.com/api_key_credentials.do?sys_id=3bb7a63c3af0471c94e51585cb9eb7cb) |
| Khepri Neon MCP alias | sys_alias | 5bf1b9550b8144bfa210efb530cd5bae | [Open](https://<YOUR_INSTANCE>.service-now.com/sys_alias.do?sys_id=5bf1b9550b8144bfa210efb530cd5bae) |
| Khepri Neon MCP connection | http_connection | eaceb5ba44644d13b980f7fb734fd98e | [Open](https://<YOUR_INSTANCE>.service-now.com/http_connection.do?sys_id=eaceb5ba44644d13b980f7fb734fd98e) |
| Khepri Neon MCP server | sn_mcp_server | 547fe99656094b12b7b7d091b542802e | [Open](https://<YOUR_INSTANCE>.service-now.com/sn_mcp_server.do?sys_id=547fe99656094b12b7b7d091b542802e) |
| Khepri Neon SQL Query tool | sn_aia_tool | f8fe5a193cea479fbd3017cab7f30214 | [Open](https://<YOUR_INSTANCE>.service-now.com/sn_aia_tool.do?sys_id=f8fe5a193cea479fbd3017cab7f30214) |
| MCP tool ↔ agent M2M | sn_aia_agent_tool_m2m | 4101715c2ace4f4ab4978b9b0adaa191 | [Open](https://<YOUR_INSTANCE>.service-now.com/sn_aia_agent_tool_m2m.do?sys_id=4101715c2ace4f4ab4978b9b0adaa191) |
| ReAct strategy (platform) | — | f0bff21f9f13c6108f431597d90a1c74 | — |

### Conventions Established
- **[khepri-auto-publish]** tag in search profile `description` field → scheduled job publishes it
- **No tag** → profile stays in DRAFT, manual publish only
- **API key only** for MCP connections (no OData)
- **Now.ID cannot be used in Record `data` fields** for reference values — use hardcoded sys_ids (two-pass: create first, capture sys_ids, then wire references)
- **Every manual step MUST include a direct link** to the record on the instance. The URL pattern is: `https://<instance>.service-now.com/<table>.do?sys_id=<sys_id>`. Never tell the user to "navigate to" something — give them a clickable link.

---

## Agent Guardrails

### 1. Three-Strike Rule
If debugging any single issue fails 3 times:
- **STOP** iterating
- Tell the user: "This needs manual investigation. Here's what to check: [specifics]"
- Do NOT keep rewriting code
- Do NOT expand the scope of changes

### 2. Blast Radius Control
When debugging an issue in any module:
- Only modify files within that module's directory
- Never modify files in unrelated directories as a "fix"
- If a fix seems to require changing unrelated files, STOP and explain why to the user

### 3. MCP-Specific Guardrails
MCP connections are fragile and external. When debugging MCP issues:
- All MCP code lives in `src/fluent/mcp/` and `src/server/mcp/`
- Never modify agent, search, or table files to "fix" MCP issues
- Run a preflight connectivity check before wiring MCP tools to agents
- If MCP connection fails, report the specific error and ask the user to fix the external service
- Do NOT rewrite connection/auth code more than once per attempt

### 4. No Scorched Earth
- Never delete and recreate a file that was previously working
- Prefer targeted `fs_find_and_replace` over full `fs_write_file` for existing files
- When adding new features, create NEW files rather than heavily modifying existing ones

### 5. Read Before Write
- Always read the current state of a file before modifying it
- Always check the manifest before making changes to understand what's proven working
- If unsure whether a change will break something, ask the user first

---

## Upcoming Work (Phases)

### Phase 3: MCP Integration
- Create MCP connection module (API key auth only, no OData)
- Create MCP server record creation
- Create MCP tool creation and agent wiring
- Preflight connectivity validation
- **Files**: `src/fluent/mcp/`, `src/server/mcp/`

### Phase 99: File Freeze
- Mark proven files as FROZEN in this manifest
- FROZEN files cannot be modified without explicit user approval
- Add checksums or version markers for frozen files
- This phase is executed when the application is stable and feature-complete

---

## Architecture Diagram

```
Khepri Application
├── Agents
│   ├── Test Agent (Khepri Ping) .............. proven
│   └── Budget Analyst (RAG) .................. proven
│       ├── RAG Retriever tool (platform)
│       └── Search pipeline
│           ├── ais_datasource → x_snc_khepri_budget_history
│           ├── ais_search_source
│           ├── ais_search_profile [khepri-auto-publish]
│           └── profile↔source M2M
├── Tables
│   └── x_snc_khepri_budget_history ........... proven (18 records)
├── Infrastructure
│   ├── Auto-publish scheduled job (5 min) .... proven
│   ├── Cross-scope privileges (AIA + AIS) .... proven
│   └── Auto-publish business rule ............ installed (passive)
└── MCP (upcoming)
    ├── Connection module (API key only)
    ├── MCP server records
    ├── MCP tool creation
    └── Preflight validation
```
