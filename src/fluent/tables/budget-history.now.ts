import "@servicenow/sdk/global";
import {
  Table,
  StringColumn,
  IntegerColumn,
  DecimalColumn,
  ReferenceColumn,
  Record,
} from "@servicenow/sdk/core";

// =====================================================
// Khepri Budget History Table
// Mirror of x_snc_forecast_v_0_cost_center_budget_history
// Used to test the full AIS search indexing pipeline
// =====================================================
export const x_snc_khepri_budget_history = Table({
  name: "x_snc_khepri_budget_history",
  label: "Khepri Budget History",
  accessible_from: "public",
  actions: ["create", "read", "update", "delete"],
  allow_web_service_access: true,
  text_index: true,
  schema: {
    cost_center: StringColumn({
      label: "Cost Center",
      maxLength: 40,
    }),
    cost_center_description: StringColumn({
      label: "Cost Center Description",
      maxLength: 200,
    }),
    fiscal_year: IntegerColumn({
      label: "Fiscal Year",
    }),
    fiscal_month: IntegerColumn({
      label: "Fiscal Month",
    }),
    monthly_budget: DecimalColumn({
      label: "Monthly Budget",
    }),
    actual_spend: DecimalColumn({
      label: "Actual Spend",
    }),
    variance: DecimalColumn({
      label: "Variance",
    }),
    variance_pct: DecimalColumn({
      label: "Variance Percent",
    }),
    status: StringColumn({
      label: "Status",
      maxLength: 40,
      choices: {
        on_target: { label: "On Target", sequence: 0 },
        over_budget: { label: "Over Budget", sequence: 1 },
        under_budget: { label: "Under Budget", sequence: 2 },
      },
    }),
    owner: ReferenceColumn({
      label: "Owner",
      referenceTable: "sys_user",
    }),
  },
});

// =====================================================
// SAMPLE DATA — 3 cost centers, multiple months
// Mimics realistic budget history patterns
// =====================================================

// --- Cost Center: CC-IT-001 (IT Operations) ---
const itOpsData = [
  { month: 1, budget: 25000, actual: 24500, variance: -500, pct: -2.0, status: "on_target" as const },
  { month: 2, budget: 25000, actual: 26200, variance: 1200, pct: 4.8, status: "on_target" as const },
  { month: 3, budget: 25000, actual: 28500, variance: 3500, pct: 14.0, status: "over_budget" as const },
  { month: 4, budget: 25000, actual: 24800, variance: -200, pct: -0.8, status: "on_target" as const },
  { month: 5, budget: 25000, actual: 30100, variance: 5100, pct: 20.4, status: "over_budget" as const },
  { month: 6, budget: 25000, actual: 23900, variance: -1100, pct: -4.4, status: "under_budget" as const },
];

itOpsData.forEach((d, i) => {
  Record({
    $id: Now.ID[`bh-it-ops-${i}`],
    table: "x_snc_khepri_budget_history",
    data: {
      cost_center: "CC-IT-001",
      cost_center_description: "IT Operations - Infrastructure & Cloud Services",
      fiscal_year: 2025,
      fiscal_month: d.month,
      monthly_budget: d.budget,
      actual_spend: d.actual,
      variance: d.variance,
      variance_pct: d.pct,
      status: d.status,
    },
  });
});

const mktData = [
  { month: 1, budget: 18000, actual: 17500, variance: -500, pct: -2.8, status: "under_budget" as const },
  { month: 2, budget: 18000, actual: 19200, variance: 1200, pct: 6.7, status: "on_target" as const },
  { month: 3, budget: 18000, actual: 22000, variance: 4000, pct: 22.2, status: "over_budget" as const },
  { month: 4, budget: 18000, actual: 17800, variance: -200, pct: -1.1, status: "on_target" as const },
  { month: 5, budget: 18000, actual: 18100, variance: 100, pct: 0.6, status: "on_target" as const },
  { month: 6, budget: 18000, actual: 16500, variance: -1500, pct: -8.3, status: "under_budget" as const },
];

mktData.forEach((d, i) => {
  Record({
    $id: Now.ID[`bh-mkt-${i}`],
    table: "x_snc_khepri_budget_history",
    data: {
      cost_center: "CC-MKT-002",
      cost_center_description: "Marketing - Digital Campaigns & Brand",
      fiscal_year: 2025,
      fiscal_month: d.month,
      monthly_budget: d.budget,
      actual_spend: d.actual,
      variance: d.variance,
      variance_pct: d.pct,
      status: d.status,
    },
  });
});

// --- Cost Center: CC-HR-003 (Human Resources) ---
const hrData = [
  { month: 1, budget: 12000, actual: 11800, variance: -200, pct: -1.7, status: "on_target" as const },
  { month: 2, budget: 12000, actual: 12100, variance: 100, pct: 0.8, status: "on_target" as const },
  { month: 3, budget: 12000, actual: 14500, variance: 2500, pct: 20.8, status: "over_budget" as const },
  { month: 4, budget: 12000, actual: 11500, variance: -500, pct: -4.2, status: "under_budget" as const },
  { month: 5, budget: 12000, actual: 15000, variance: 3000, pct: 25.0, status: "over_budget" as const },
  { month: 6, budget: 12000, actual: 11900, variance: -100, pct: -0.8, status: "on_target" as const },
];

hrData.forEach((d, i) => {
  Record({
    $id: Now.ID[`bh-hr-${i}`],
    table: "x_snc_khepri_budget_history",
    data: {
      cost_center: "CC-HR-003",
      cost_center_description: "Human Resources - Talent Acquisition & Training",
      fiscal_year: 2025,
      fiscal_month: d.month,
      monthly_budget: d.budget,
      actual_spend: d.actual,
      variance: d.variance,
      variance_pct: d.pct,
      status: d.status,
    },
  });
});
