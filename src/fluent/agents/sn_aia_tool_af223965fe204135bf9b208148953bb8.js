(function(inputs) {
    try {
        var extractor = new KhepriExtractCostCenter();
        var result = extractor.extract(inputs.event_id || '');
        return result;
    } catch (e) {
        gs.error('[Khepri] Extract Cost Center tool error: ' + e.message);
        return JSON.stringify({
            success: false,
            error: 'Script execution failed: ' + e.message,
            event_id: inputs.event_id || '(none)',
            hint: 'Check syslog_app_scope for [Khepri] prefix'
        });
    }
})(inputs);