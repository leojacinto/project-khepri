/**
 * Context processing script for Khepri Test Agent
 * Standard passthrough — returns pageContext and triggerContext unchanged.
 */
(function(task, user_utterance, agent_id, context) {
    return {
        pageContext: context && context.pageContext ? context.pageContext : {},
        triggerContext: context && context.triggerContext ? context.triggerContext : {}
    };
})(task, user_utterance, agent_id, context);
