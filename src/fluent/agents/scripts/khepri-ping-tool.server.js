(function(inputs) {
    // Khepri System Ping Tool
    // Returns system information to prove the agent is alive
    var now = new GlideDateTime();
    var user = gs.getUserName();
    var userDisplayName = gs.getUserDisplayName();
    var sessionId = gs.getSessionID();

    return {
        status: "success",
        message: "Khepri is alive! This agent was created via direct table population — no AI Agent Studio was used.",
        system_time: now.getDisplayValue(),
        current_user: userDisplayName,
        user_id: user,
        session_id: sessionId,
        creation_method: "Fluent Record API -> sn_aia_* tables",
        origin: "Khepri — The AI Agent Self-Creation Engine"
    };
})(inputs);
