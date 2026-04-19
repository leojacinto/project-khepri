(function(inputs) {
    try {
        var analyzer = new KhepriBudgetVarianceAnalysis();
        var result = analyzer.analyze(inputs.cost_center || '', inputs.event_id || '');
        return result;
    } catch (e) {
        gs.error('[Khepri] Budget Variance Analysis tool error: ' + e.message);
        return JSON.stringify({
            success: false,
            error: 'Script execution failed: ' + e.message,
            cost_center: inputs.cost_center || '(none)',
            event_id: inputs.event_id || '(none)',
            hint: 'Check syslog_app_scope for [Khepri] prefix'
        });
    }
})(inputs);