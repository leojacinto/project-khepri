import { gs } from "@servicenow/glide";
import { GlideRecord } from "@servicenow/glide";
import { Synchronizer } from "@servicenow/glide/sn_ais";

/**
 * Auto-publish a search profile when a profile↔source M2M record
 * is created in the Khepri scope. This ensures the datasource,
 * search source, search profile, and M2M link all exist before
 * the Synchronizer.publishProfile() call is made.
 */
export function autoPublishSearchProfile(current) {
    var profileId = current.getValue("profile");
    if (!profileId) {
        gs.warn("[Khepri] No profile ID found on M2M record");
        return;
    }

    var profileGr = new GlideRecord("ais_search_profile");
    if (!profileGr.get(profileId)) {
        gs.warn("[Khepri] Search profile not found: " + profileId);
        return;
    }

    var profileName = profileGr.getValue("name");
    var profileState = profileGr.getValue("state");

    // Only publish if profile is not already published
    if (profileState === "PUBLISHED") {
        gs.info("[Khepri] Profile already published: " + profileName);
        return;
    }

    gs.info("[Khepri] Auto-publishing search profile: " + profileName);

    try {
        var synchronizer = new Synchronizer();
        var result = synchronizer.publishProfile(profileName);

        if (result) {
            gs.info("[Khepri] Successfully published search profile: " + profileName);
            // Update the state field to PUBLISHED
            profileGr.setValue("state", "PUBLISHED");
            profileGr.update();
        } else {
            gs.warn("[Khepri] Failed to publish search profile: " + profileName + ". The profile may need manual publishing from the AI Search console.");
        }
    } catch (e) {
        gs.error("[Khepri] Error publishing search profile: " + profileName + " — " + e.message);
    }
}
