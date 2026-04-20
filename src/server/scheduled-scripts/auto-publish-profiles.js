// @ts-nocheck
(function() {
    var AUTO_PUBLISH_TAG = "[khepri-auto-publish]";
    var KHEPRI_SCOPE_ID = "31ca590e2fdc8f18920fa33fafa4e3fd";

    gs.info("[Khepri] Auto-publish scheduled job started — scanning for tagged profiles");

    var profileGr = new GlideRecord("ais_search_profile");
    profileGr.addQuery("sys_scope", KHEPRI_SCOPE_ID);
    profileGr.addQuery("active", "true");
    profileGr.addQuery("description", "CONTAINS", AUTO_PUBLISH_TAG);
    profileGr.query();

    var count = 0;
    var published = 0;
    var failed = 0;
    var skipped = 0;

    while (profileGr.next()) {
        count++;
        var profileName = profileGr.getValue("name");
        var profileLabel = profileGr.getValue("label");
        var currentState = profileGr.getValue("state");

        gs.info("[Khepri] Found tagged profile: " + profileLabel + " (" + profileName + ") state=" + currentState);

        // Verify the profile has at least one search source linked
        var m2mGr = new GlideRecord("ais_search_profile_ais_search_source_m2m");
        m2mGr.addQuery("profile", profileGr.getUniqueValue());
        m2mGr.query();

        if (!m2mGr.hasNext()) {
            skipped++;
            gs.warn("[Khepri] Skipping profile '" + profileLabel + "' — no search sources linked yet");
            continue;
        }

        try {
            var synchronizer = new sn_ais.Synchronizer();
            var result = synchronizer.publishProfile(profileName);

            if (result) {
                published++;
                gs.info("[Khepri] Successfully published profile: " + profileLabel + " (was " + currentState + ")");

                // Ensure state is PUBLISHED
                if (currentState !== "PUBLISHED") {
                    profileGr.setValue("state", "PUBLISHED");
                    profileGr.update();
                }
            } else {
                failed++;
                gs.warn("[Khepri] Synchronizer returned false for profile: " + profileLabel);
            }
        } catch (e) {
            failed++;
            gs.error("[Khepri] Error publishing profile '" + profileLabel + "': " + e.message);
        }
    }

    gs.info("[Khepri] Auto-publish complete — Tagged: " + count + ", Published: " + published + ", Skipped: " + skipped + ", Failed: " + failed);
})();
