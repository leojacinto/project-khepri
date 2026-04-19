import "@servicenow/sdk/global";
import {
  Table,
  StringColumn,
  DecimalColumn,
  DateColumn,
  Record,
} from "@servicenow/sdk/core";

// =====================================================
// Expense Transactions (Khepri scope)
// Equivalent of x_snc_forecast_v_0_expense_transactions
// =====================================================
export const x_snc_khepri_expense_transactions = Table({
  name: "x_snc_khepri_expense_transactions",
  label: "Expense Transactions",
  accessible_from: "public",
  actions: ["create", "read", "update", "delete"],
  allow_web_service_access: true,
  text_index: true,
  schema: {
    expense_id: StringColumn({ label: "Expense ID", maxLength: 40 }),
    cost_center: StringColumn({ label: "Cost Center", maxLength: 40 }),
    vendor: StringColumn({ label: "Vendor", maxLength: 100 }),
    expense_category: StringColumn({ label: "Expense Category", maxLength: 100 }),
    description: StringColumn({ label: "Description", maxLength: 200 }),
    amount: DecimalColumn({ label: "Amount" }),
    expense_date: DateColumn({ label: "Expense Date" }),
    gl_account: StringColumn({ label: "GL Account", maxLength: 20 }),
  },
});

// Seed data - static Record() calls (no forEach)
export const exp0 = Record({ $id: Now.ID["fv-expense-0"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0007", cost_center: "BIZD-IT-01", vendor: "Alitalia", expense_category: "Travel", description: "Milan Conference", amount: 7200, expense_date: "2025-01-12", gl_account: "610000" } });
export const exp1 = Record({ $id: Now.ID["fv-expense-1"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0008", cost_center: "BIZD-IT-01", vendor: "Gartner", expense_category: "Services", description: "Market Research", amount: 8700, expense_date: "2025-01-20", gl_account: "610000" } });
export const exp2 = Record({ $id: Now.ID["fv-expense-2"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0009", cost_center: "BIZD-IT-01", vendor: "Hays Italy", expense_category: "Personnel", description: "BD Specialist", amount: 9400, expense_date: "2025-02-14", gl_account: "610000" } });
export const exp3 = Record({ $id: Now.ID["fv-expense-3"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0010", cost_center: "BIZD-IT-01", vendor: "Salesforce", expense_category: "Services", description: "CRM License", amount: 6300, expense_date: "2025-02-22", gl_account: "610000" } });
export const exp4 = Record({ $id: Now.ID["fv-expense-4"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0011", cost_center: "BIZD-IT-01", vendor: "Emirates", expense_category: "Travel", description: "Partner Visit", amount: 8900, expense_date: "2025-03-08", gl_account: "610000" } });
export const exp5 = Record({ $id: Now.ID["fv-expense-5"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0013", cost_center: "BIZD-JP-01", vendor: "JAL", expense_category: "Travel", description: "Tokyo Summit", amount: 11400, expense_date: "2025-01-10", gl_account: "610100" } });
export const exp6 = Record({ $id: Now.ID["fv-expense-6"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0017", cost_center: "BIZD-JP-01", vendor: "Hays Japan", expense_category: "Personnel", description: "Sales Lead", amount: 10600, expense_date: "2025-03-14", gl_account: "610100" } });
export const exp7 = Record({ $id: Now.ID["fv-expense-7"], table: "x_snc_khepri_expense_transactions", data: { expense_id: "EXP-2025-0166", cost_center: "BIZD-IT-01", vendor: "IDC", expense_category: "Services", description: "Analysis", amount: 7900, expense_date: "2025-05-12", gl_account: "610000" } });
