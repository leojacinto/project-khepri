var KhepriBudgetVarianceAnalysis = Class.create();
KhepriBudgetVarianceAnalysis.prototype = {
    initialize: function() {},

    analyze: function(costCenter, eventId) {
        gs.info('KHEPRI_BVA: START costCenter=' + costCenter + ' eventId=' + eventId);

        if (!costCenter) {
            return JSON.stringify({ success: false, message: 'cost_center is required' });
        }

        // Step 1: Look up cc_budget_history
        var budgetGr = new GlideRecord('x_snc_khepri_cc_budget_history');
        budgetGr.addQuery('cost_center', costCenter);
        budgetGr.orderByDesc('fiscal_month');
        budgetGr.setLimit(1);
        budgetGr.query();

        var baselineAmount = 0;
        var actualAmount = 0;
        var budgetData = null;

        if (budgetGr.next()) {
            baselineAmount = parseFloat(budgetGr.getValue('monthly_budget')) || 0;
            actualAmount = parseFloat(budgetGr.getValue('actual_spend')) || 0;
            budgetData = {
                cost_center: budgetGr.getValue('cost_center') || '',
                cost_center_description: budgetGr.getValue('cost_center_description') || '',
                fiscal_year: budgetGr.getValue('fiscal_year') || '',
                fiscal_month: budgetGr.getValue('fiscal_month') || '',
                monthly_budget: baselineAmount,
                actual_spend: actualAmount,
                variance: parseFloat(budgetGr.getValue('variance')) || 0,
                variance_pct: parseFloat(budgetGr.getValue('variance_pct')) || 0,
                status: budgetGr.getValue('status') || 'Unknown'
            };
            gs.info('KHEPRI_BVA: Budget found. baseline=' + baselineAmount + ' actual=' + actualAmount);
        } else {
            gs.warn('KHEPRI_BVA: No budget record found for ' + costCenter);
        }

        // Step 2: Look up expense event
        var eventAmount = 0;
        if (eventId) {
            var eventGr = new GlideRecord('x_snc_khepri_expense_event');
            eventGr.addQuery('event_id', eventId);
            eventGr.setLimit(1);
            eventGr.query();
            if (eventGr.next()) {
                eventAmount = parseFloat(eventGr.getValue('amount_usd')) || 0;
                gs.info('KHEPRI_BVA: Event found. amount=' + eventAmount);
            } else {
                gs.warn('KHEPRI_BVA: No event found for ' + eventId);
            }
        }

        // Step 3: Compute variance
        var projectedTotal = actualAmount + eventAmount;
        var projectedVariance = projectedTotal - baselineAmount;
        var projectedVariancePct = baselineAmount > 0
            ? ((projectedVariance / baselineAmount) * 100).toFixed(2)
            : 0;

        // Step 4: Assessment
        var assessment = projectedVariance > 0 ? 'OVER BUDGET' : (projectedVariance < 0 ? 'UNDER BUDGET' : 'ON TARGET');
        gs.info('KHEPRI_BVA: Variance=' + projectedVariance + ' Assessment=' + assessment);

        // Step 5: Create Finance Case
        var financeCaseSysId = '';
        var financeCaseNumber = '';
        var financeCaseError = '';

        gs.info('KHEPRI_BVA: Attempting Finance Case creation on sn_spend_sdc_service_request');

        var caseGr = new GlideRecord('sn_spend_sdc_service_request');
        gs.info('KHEPRI_BVA: GlideRecord created. isValid=' + caseGr.isValid() + ' tableName=' + caseGr.getTableName());
        gs.info('KHEPRI_BVA: canCreate=' + caseGr.canCreate());

        caseGr.initialize();
        gs.info('KHEPRI_BVA: initialized');

        var shortDesc = 'Budget Variance Alert: ' + costCenter + ' — Projected ' + assessment +
            ' by $' + Math.abs(projectedVariance).toFixed(2) + ' (' + projectedVariancePct + '%)';
        caseGr.setValue('short_description', shortDesc);
        caseGr.setValue('description',
            'Khepri Agent BVA\nCost Center: ' + costCenter +
            '\nEvent: ' + (eventId || 'N/A') +
            '\nBaseline: $' + baselineAmount.toFixed(2) +
            '\nActual: $' + actualAmount.toFixed(2) +
            '\nEvent Amount: $' + eventAmount.toFixed(2) +
            '\nProjected: $' + projectedTotal.toFixed(2) +
            '\nVariance: $' + projectedVariance.toFixed(2) + ' (' + projectedVariancePct + '%)' +
            '\nAssessment: ' + assessment);

        gs.info('KHEPRI_BVA: Fields set. Calling insert()...');
        var insertedSysId = caseGr.insert();
        gs.info('KHEPRI_BVA: insert() returned: ' + insertedSysId);

        if (insertedSysId) {
            financeCaseSysId = insertedSysId;
            financeCaseNumber = caseGr.getValue('number') || '';
            gs.info('KHEPRI_BVA: SUCCESS. Case=' + financeCaseNumber + ' sys_id=' + financeCaseSysId);
        } else {
            financeCaseError = 'insert returned null. canCreate=' + caseGr.canCreate();
            gs.error('KHEPRI_BVA: FAILED. ' + financeCaseError);
        }

        // Step 6: Return
        var result = {
            success: true,
            cost_center: costCenter,
            event_id: eventId || 'N/A',
            event_amount: eventAmount,
            baseline_amount: baselineAmount,
            actual_amount: actualAmount,
            projected_total: projectedTotal,
            projected_variance: projectedVariance,
            projected_variance_pct: projectedVariancePct,
            assessment: assessment,
            finance_case_sys_id: financeCaseSysId,
            finance_case_number: financeCaseNumber,
            finance_case_error: financeCaseError,
            budget_data: budgetData,
            message: 'BVA for ' + costCenter + ': Variance $' + projectedVariance.toFixed(2) +
                ' (' + projectedVariancePct + '%). ' + assessment +
                (financeCaseNumber ? '. Finance Case: ' + financeCaseNumber : '. FC FAILED: ' + financeCaseError)
        };

        gs.info('KHEPRI_BVA: END');
        return JSON.stringify(result);
    },

    type: 'KhepriBudgetVarianceAnalysis'
};
