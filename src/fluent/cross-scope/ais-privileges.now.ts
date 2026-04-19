import "@servicenow/sdk/global";
import { CrossScopePrivilege } from "@servicenow/sdk/core";

// =====================================================
// Cross-scope privileges for AIS (AI Search) tables
// These are global-scope tables but we declare access
// explicitly for defense-in-depth.
// =====================================================

// --- ais_datasource (AI Search Indexed Source) ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-datasource-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_datasource",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-datasource-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_datasource",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-datasource-write"],
  status: "allowed",
  operation: "write",
  targetName: "ais_datasource",
  targetScope: "global",
  targetType: "sys_db_object",
});

// --- ais_datasource_attribute ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-ds-attr-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_datasource_attribute",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-ds-attr-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_datasource_attribute",
  targetScope: "global",
  targetType: "sys_db_object",
});

// --- ais_search_source ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-source-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_search_source",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-source-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_search_source",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-source-write"],
  status: "allowed",
  operation: "write",
  targetName: "ais_search_source",
  targetScope: "global",
  targetType: "sys_db_object",
});

// --- ais_search_profile ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-profile-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_search_profile",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-profile-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_search_profile",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-search-profile-write"],
  status: "allowed",
  operation: "write",
  targetName: "ais_search_profile",
  targetScope: "global",
  targetType: "sys_db_object",
});

// --- ais_search_profile_ais_search_source_m2m ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-profile-source-m2m-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_search_profile_ais_search_source_m2m",
  targetScope: "global",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-profile-source-m2m-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_search_profile_ais_search_source_m2m",
  targetScope: "global",
  targetType: "sys_db_object",
});

// --- sn_ais.Synchronizer (publish search profiles) ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-synchronizer-execute"],
  status: "allowed",
  operation: "execute",
  targetName: "Synchronizer",
  targetScope: "sn_ais",
  targetType: "sys_script_include",
});

// --- ais_ai_agent_semantic_search_configuration_m2m ---
CrossScopePrivilege({
  $id: Now.ID["csp-ais-semantic-m2m-create"],
  status: "allowed",
  operation: "create",
  targetName: "ais_ai_agent_semantic_search_configuration_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-semantic-m2m-read"],
  status: "allowed",
  operation: "read",
  targetName: "ais_ai_agent_semantic_search_configuration_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-ais-semantic-m2m-write"],
  status: "allowed",
  operation: "write",
  targetName: "ais_ai_agent_semantic_search_configuration_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});
