import "@servicenow/sdk/global";
import { Record } from "@servicenow/sdk/core";

// KHEPRI RAG TOOLS
// Two separate sn_aia_tool records (type: rag), one per
// search pipeline. This avoids the Fluent build validator
// uniqueness constraint on (agent, tool) in M2M records.

// RAG tool for Cost Center Budget History
export const khepriCcBudgetRagTool = Record({
  $id: Now.ID["khepri-cc-budget-rag-tool"],
  table: "sn_aia_tool",
  data: {
    name: "Khepri CC Budget History RAG",
    type: "rag",
    active: "true",
    record_type: "custom",
    description: "Retrieve cost center budget history data via semantic search.",
    target_document: "5345d14277e81210e9c41345ba5a9933",
    target_document_table: "sys_one_extend_capability",
    input_schema: JSON.stringify([
      { name: "search_type", description: "Search type" },
      { name: "search_profile", description: "Search profile" },
      { name: "sources", description: "Search sources" },
      { name: "fields", description: "Fields to be returned" },
      { name: "search_results_limit", description: "Search results limit" },
      { name: "semantic_index_names", description: "Semantic indexed fields" },
      { name: "query", description: "Search query" },
      { name: "document_match_threshold", description: "Document matching threshold" },
    ]),
  },
});

// RAG tool for Expense Transactions
export const khepriExpenseRagTool = Record({
  $id: Now.ID["khepri-expense-rag-tool"],
  table: "sn_aia_tool",
  data: {
    name: "Khepri Expense Transactions RAG",
    type: "rag",
    active: "true",
    record_type: "custom",
    description: "Retrieve expense transaction data via semantic search.",
    target_document: "5345d14277e81210e9c41345ba5a9933",
    target_document_table: "sys_one_extend_capability",
    input_schema: JSON.stringify([
      { name: "search_type", description: "Search type" },
      { name: "search_profile", description: "Search profile" },
      { name: "sources", description: "Search sources" },
      { name: "fields", description: "Fields to be returned" },
      { name: "search_results_limit", description: "Search results limit" },
      { name: "semantic_index_names", description: "Semantic indexed fields" },
      { name: "query", description: "Search query" },
      { name: "document_match_threshold", description: "Document matching threshold" },
    ]),
  },
});
