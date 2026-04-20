import "@servicenow/sdk/global";
import { BusinessRule } from "@servicenow/sdk/core";
import { autoPublishSearchProfile } from "../../server/auto-publish-search-profile.js";

// ---
// AUTO-PUBLISH SEARCH PROFILES
// Fires when a search source is linked to a search
// profile via the M2M table. If the parent profile
// belongs to the Khepri scope, auto-publish it using
// the sn_ais.Synchronizer API.
// ---
BusinessRule({
  $id: Now.ID["br-auto-publish-search-profile"],
  name: "Khepri Auto-Publish Search Profile",
  table: "ais_search_profile_ais_search_source_m2m",
  when: "async",
  action: ["insert", "update"],
  active: true,
  order: 200,
  description:
    "Automatically publishes search profiles belonging to the Khepri scope when a search source is linked to them. This enables fully programmatic search index creation without manual UI steps.",
  script: autoPublishSearchProfile,
});
