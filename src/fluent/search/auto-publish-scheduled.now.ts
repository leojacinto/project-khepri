import "@servicenow/sdk/global";
import { ScheduledScript } from "@servicenow/sdk/core";

// =====================================================
// KHEPRI AUTO-PUBLISH SCHEDULED JOB
// Runs every 5 minutes to check for unpublished search
// profiles in the Khepri scope and publishes them via
// sn_ais.Synchronizer.publishProfile().
//
// This handles the gap where the install process
// bypasses business rules (setWorkflow=false), so we
// need a scheduled job to pick up newly created profiles.
// =====================================================
ScheduledScript({
  $id: Now.ID["khepri-auto-publish-job"],
  name: "Khepri Auto-Publish Search Profiles",
  script: Now.include(
    "../../server/scheduled-scripts/auto-publish-profiles.js"
  ),
  frequency: "periodically",
  executionInterval: Duration({ minutes: 5 }),
  advanced: true,
  active: true,
});
