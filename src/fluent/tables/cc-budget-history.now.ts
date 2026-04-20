import "@servicenow/sdk/global";
import {
  Table,
  StringColumn,
  IntegerColumn,
  DecimalColumn,
  Record,
} from "@servicenow/sdk/core";

// ---
// Cost Center Budget History (Khepri scope)
// Equivalent of x_snc_forecast_v_0_cost_center_budget_history
// ---
export const x_snc_khepri_cc_budget_history = Table({
  name: "x_snc_khepri_cc_budget_history",
  label: "Cost Center Budget History",
  accessible_from: "public",
  actions: ["create", "read", "update", "delete"],
  allow_web_service_access: true,
  text_index: true,
  schema: {
    cost_center: StringColumn({ label: "Cost Center", maxLength: 40 }),
    cost_center_description: StringColumn({ label: "Cost Center Description", maxLength: 200 }),
    fiscal_year: IntegerColumn({ label: "Fiscal Year" }),
    fiscal_month: IntegerColumn({ label: "Fiscal Month" }),
    monthly_budget: DecimalColumn({ label: "Monthly Budget" }),
    actual_spend: DecimalColumn({ label: "Actual Spend" }),
    variance: DecimalColumn({ label: "Variance" }),
    variance_pct: DecimalColumn({ label: "Variance Percent" }),
    status: StringColumn({ label: "Status", maxLength: 40 }),
  },
});

// Seed data - static Record() calls (no forEach, numbers stay as numbers for typed tables)
export const ccBudget0 = Record({ $id: Now.ID["fv-cc-budget-0"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-IT-01", cost_center_description: "Business Development - Licensing - Italy", fiscal_year: 2025, fiscal_month: 1, monthly_budget: 15833, actual_spend: 15900, variance: 67, variance_pct: 0.4, status: "On Target" } });
export const ccBudget1 = Record({ $id: Now.ID["fv-cc-budget-1"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-IT-01", cost_center_description: "Business Development - Licensing - Italy", fiscal_year: 2025, fiscal_month: 5, monthly_budget: 15833, actual_spend: 15900, variance: 67, variance_pct: 0.4, status: "On Target" } });
export const ccBudget2 = Record({ $id: Now.ID["fv-cc-budget-2"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-IT-01", cost_center_description: "Business Development - Licensing - Italy", fiscal_year: 2025, fiscal_month: 10, monthly_budget: 15833, actual_spend: 15800, variance: -33, variance_pct: -0.2, status: "On Target" } });
export const ccBudget3 = Record({ $id: Now.ID["fv-cc-budget-3"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-JP-01", cost_center_description: "Business Development - Licensing - Japan", fiscal_year: 2025, fiscal_month: 1, monthly_budget: 20833, actual_spend: 22000, variance: 1167, variance_pct: 5.6, status: "Over Budget" } });
export const ccBudget4 = Record({ $id: Now.ID["fv-cc-budget-4"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-JP-01", cost_center_description: "Business Development - Licensing - Japan", fiscal_year: 2025, fiscal_month: 6, monthly_budget: 20833, actual_spend: 21500, variance: 667, variance_pct: 3.2, status: "Over Budget" } });
export const ccBudget5 = Record({ $id: Now.ID["fv-cc-budget-5"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "BIZD-JP-01", cost_center_description: "Business Development - Licensing - Japan", fiscal_year: 2025, fiscal_month: 12, monthly_budget: 20833, actual_spend: 23100, variance: 2267, variance_pct: 10.9, status: "Over Budget" } });
export const ccBudget6 = Record({ $id: Now.ID["fv-cc-budget-6"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "CC_IT_001", cost_center_description: "IT Operations - Infrastructure & Cloud Services", fiscal_year: 2025, fiscal_month: 9, monthly_budget: 45000, actual_spend: 42800, variance: -2200, variance_pct: -4.9, status: "Under Budget" } });
export const ccBudget7 = Record({ $id: Now.ID["fv-cc-budget-7"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "CC_IT_001", cost_center_description: "IT Operations - Infrastructure & Cloud Services", fiscal_year: 2025, fiscal_month: 10, monthly_budget: 45000, actual_spend: 47200, variance: 2200, variance_pct: 4.9, status: "Over Budget" } });
export const ccBudget8 = Record({ $id: Now.ID["fv-cc-budget-8"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "CC_IT_001", cost_center_description: "IT Operations - Infrastructure & Cloud Services", fiscal_year: 2025, fiscal_month: 11, monthly_budget: 45000, actual_spend: 44900, variance: -100, variance_pct: -0.2, status: "On Target" } });
export const ccBudget9 = Record({ $id: Now.ID["fv-cc-budget-9"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "CC_IT_002", cost_center_description: "IT Operations - Software & Licensing", fiscal_year: 2025, fiscal_month: 9, monthly_budget: 30000, actual_spend: 28500, variance: -1500, variance_pct: -5.0, status: "Under Budget" } });
export const ccBudget10 = Record({ $id: Now.ID["fv-cc-budget-10"], table: "x_snc_khepri_cc_budget_history", data: { cost_center: "CC_IT_002", cost_center_description: "IT Operations - Software & Licensing", fiscal_year: 2025, fiscal_month: 10, monthly_budget: 30000, actual_spend: 31080, variance: 1080, variance_pct: 3.6, status: "Over Budget" } });
