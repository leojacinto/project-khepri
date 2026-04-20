// @ts-nocheck
var KhepriExtractCostCenter = Class.create();
KhepriExtractCostCenter.prototype = {
    initialize: function() {},

    /**
     * Extract cost center from the latest event or by event_id.
     * @param {string} eventId - optional event ID to look up directly
     * @returns {string} JSON with cost_center, vendor, amount_usd, event_id
     */
    extract: function(eventId) {
        var gr = new GlideRecord('x_snc_khepri_expense_event');

        if (eventId && eventId !== '') {
            gr.addQuery('event_id', eventId);
        } else {
            gr.orderByDesc('sys_created_on');
        }

        gr.setLimit(1);
        gr.query();

        if (gr.next()) {
            return JSON.stringify({
                success: true,
                event_id: gr.getValue('event_id') || '',
                cost_center: gr.getValue('cost_center') || '',
                vendor: gr.getValue('vendor') || '',
                amount_usd: gr.getValue('amount_usd') || '0',
                billing_period: gr.getValue('billing_period') || '',
                service_category: gr.getValue('service_category') || '',
                gl_account: gr.getValue('gl_account') || ''
            });
        }

        return JSON.stringify({
            success: false,
            message: 'No expense transaction event found' + (eventId ? ' for event_id: ' + eventId : '')
        });
    },

    type: 'KhepriExtractCostCenter'
};
