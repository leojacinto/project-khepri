import "@servicenow/sdk/global";
import {
  Table,
  StringColumn,
  DecimalColumn,
  DateTimeColumn,
  Record,
} from "@servicenow/sdk/core";

// ---
// Expense Transaction Event (Khepri scope)
// Equivalent of x_snc_forecast_v_0_expense_transaction_event
// ---
export const x_snc_khepri_expense_event = Table({
  name: "x_snc_khepri_expense_event",
  label: "Expense Transaction Event",
  accessible_from: "public",
  actions: ["create", "read", "update", "delete"],
  allow_web_service_access: true,
  schema: {
    event_id: StringColumn({ label: "Event ID", maxLength: 80, mandatory: true }),
    cost_center: StringColumn({ label: "Cost Center", maxLength: 40, mandatory: true }),
    vendor: StringColumn({ label: "Vendor", maxLength: 200, mandatory: true }),
    amount_usd: DecimalColumn({ label: "Amount USD" }),
    event_type: StringColumn({ label: "Event Type", maxLength: 40 }),
    billing_period: StringColumn({ label: "Billing Period", maxLength: 20 }),
    invoice_id: StringColumn({ label: "Invoice ID", maxLength: 40 }),
    gl_account: StringColumn({ label: "GL Account", maxLength: 20 }),
    source_system: StringColumn({ label: "Source System", maxLength: 40 }),
    service_category: StringColumn({ label: "Service Category", maxLength: 100 }),
    priority: StringColumn({ label: "Priority", maxLength: 20 }),
    business_unit: StringColumn({ label: "Business Unit", maxLength: 40 }),
    region: StringColumn({ label: "Region", maxLength: 40 }),
    correlation_id: StringColumn({ label: "Correlation ID", maxLength: 80 }),
    timestamp: DateTimeColumn({ label: "Timestamp" }),
  },
});

// Seed data - all values must be strings for Record API
export const event0 = Record({
  $id: Now.ID["fv-event-0"],
  table: "x_snc_khepri_expense_event",
  data: {
    event_id: "EXP-2025-IT-002-1007-01",
    cost_center: "CC_IT_001",
    vendor: "Amazon Web Services",
    amount_usd: 5200.75,
    event_type: "EXPENSE_TRANSACTION",
    billing_period: "2025-10",
    invoice_id: "AWS-INV-928172",
    gl_account: "610100",
    source_system: "AWS-Billing",
    service_category: "Cloud Infrastructure",
    priority: "NORMAL",
    business_unit: "IT",
    region: "us-east-1",
    correlation_id: "KAFKA-AWS-IT002-20251007",
  },
});

export const event1 = Record({
  $id: Now.ID["fv-event-1"],
  table: "x_snc_khepri_expense_event",
  data: {
    event_id: "EXP-2025-IT-002-1010-01",
    cost_center: "CC_IT_002",
    vendor: "TechSource Solutions Inc.",
    amount_usd: 3080,
    event_type: "EXPENSE_TRANSACTION",
    billing_period: "2025-10",
    gl_account: "610100",
    source_system: "Manual",
    service_category: "Software",
    priority: "NORMAL",
    business_unit: "IT",
    region: "us-west-2",
  },
});

export const event2 = Record({
  $id: Now.ID["fv-event-2"],
  table: "x_snc_khepri_expense_event",
  data: {
    event_id: "EXP-2025-BIZD-IT-01-0301-01",
    cost_center: "BIZD-IT-01",
    vendor: "Gartner",
    amount_usd: 8700,
    event_type: "EXPENSE_TRANSACTION",
    billing_period: "2025-03",
    gl_account: "610000",
    source_system: "Manual",
    service_category: "Services",
    priority: "NORMAL",
    business_unit: "Business Development",
    region: "eu-south-1",
  },
});
