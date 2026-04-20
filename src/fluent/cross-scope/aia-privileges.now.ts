import "@servicenow/sdk/global";
import { CrossScopePrivilege } from "@servicenow/sdk/core";

// ---
// Cross-scope privileges for sn_aia_agent table
// ---
CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-create"],
  status: "allowed",
  operation: "create",
  targetName: "sn_aia_agent",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-read"],
  status: "allowed",
  operation: "read",
  targetName: "sn_aia_agent",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-write"],
  status: "allowed",
  operation: "write",
  targetName: "sn_aia_agent",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

// ---
// Cross-scope privileges for sn_aia_tool table
// ---
CrossScopePrivilege({
  $id: Now.ID["csp-aia-tool-create"],
  status: "allowed",
  operation: "create",
  targetName: "sn_aia_tool",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-tool-read"],
  status: "allowed",
  operation: "read",
  targetName: "sn_aia_tool",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-tool-write"],
  status: "allowed",
  operation: "write",
  targetName: "sn_aia_tool",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

// ---
// Cross-scope privileges for sn_aia_agent_tool_m2m table
// ---
CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-tool-m2m-create"],
  status: "allowed",
  operation: "create",
  targetName: "sn_aia_agent_tool_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-tool-m2m-read"],
  status: "allowed",
  operation: "read",
  targetName: "sn_aia_agent_tool_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-tool-m2m-write"],
  status: "allowed",
  operation: "write",
  targetName: "sn_aia_agent_tool_m2m",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

// ---
// Cross-scope privileges for sn_aia_agent_config table
// ---
CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-config-create"],
  status: "allowed",
  operation: "create",
  targetName: "sn_aia_agent_config",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-config-read"],
  status: "allowed",
  operation: "read",
  targetName: "sn_aia_agent_config",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

CrossScopePrivilege({
  $id: Now.ID["csp-aia-agent-config-write"],
  status: "allowed",
  operation: "write",
  targetName: "sn_aia_agent_config",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});

// ---
// Cross-scope privileges for sn_aia_strategy table (read-only)
// ---
CrossScopePrivilege({
  $id: Now.ID["csp-aia-strategy-read"],
  status: "allowed",
  operation: "read",
  targetName: "sn_aia_strategy",
  targetScope: "sn_aia",
  targetType: "sys_db_object",
});
