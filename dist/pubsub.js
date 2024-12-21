var _0357 = (function () {
	'use strict';

	var pubsub = (function($, undefined1) {
	    if (typeof $ !== 'function') {
	        console.warn('jQuery is not loaded.');
	        return false;
	    }
	    var o = $({});
	    function byPriority(a, b) {
	        var _a_data, _b_data;
	        var _a_data_priority;
	        var p1 = (_a_data_priority = a === null || a === void 0 ? void 0 : (_a_data = a.data) === null || _a_data === void 0 ? void 0 : _a_data.priority) !== null && _a_data_priority !== void 0 ? _a_data_priority : 10;
	        var _b_data_priority;
	        var p2 = (_b_data_priority = b === null || b === void 0 ? void 0 : (_b_data = b.data) === null || _b_data === void 0 ? void 0 : _b_data.priority) !== null && _b_data_priority !== void 0 ? _b_data_priority : 10;
	        return p1 - p2;
	    }
	    $.getSubscribedEvents = function() {
	        let eventName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : undefined1, sort = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
	        let allEvents = {};
	        if (typeof $._data === 'function') {
	            allEvents = $.extend(true, {}, $._data(o.get(0), 'events') || {});
	        } else if (typeof o.data === 'function') {
	            allEvents = $.extend(true, {}, o.data('events') || {});
	        }
	        if (typeof eventName === 'undefined') {
	            return allEvents;
	        }
	        if (!(eventName in allEvents)) {
	            return [];
	        }
	        sort && allEvents[eventName].sort(byPriority);
	        return allEvents[eventName];
	    };
	    $.subscribe = function() {
	        var parameters = Object.values(arguments);
	        if (typeof parameters[1] == 'number') {
	            parameters[1] = {
	                priority: parameters[1]
	            };
	        }
	        o.on.apply(o, parameters);
	    };
	    $.unsubscribe = function() {
	        o.off.apply(o, arguments);
	    };
	    $.unsubscribeAll = function() {
	        o.off();
	    };
	    $.subscribeOnce = function() {
	        var parameters = Object.values(arguments);
	        if (parameters.length <= 2) {
	            parameters[2] = parameters[1];
	            parameters[1] = {
	                subscribeOnce: true
	            };
	        } else if (typeof parameters[1] == 'number') {
	            parameters[1] = {
	                priority: parameters[1],
	                subscribeOnce: true
	            };
	        } else if ([
	            'object',
	            'function'
	        ].includes(typeof parameters[1]) && parameters[1] !== null) {
	            parameters[1].subscribeOnce = true;
	        }
	        o.on.apply(o, parameters);
	    };
	    $.publish = function() {
	        var parameters = Object.values(arguments), name = parameters.shift(), events = $.getSubscribedEvents(name);
	        events.forEach(function(event) {
	            var _event_data;
	            const response = event.handler.apply((_event_data = event.data) !== null && _event_data !== void 0 ? _event_data : {}, parameters);
	            if (typeof response !== 'undefined') {
	                parameters[0] = response;
	            }
	            if (event.data && [
	                'object',
	                'function'
	            ].includes(typeof event.data) && 'subscribeOnce' in event.data && event.data.subscribeOnce) {
	                $.unsubscribe(name, event.handler);
	            }
	        });
	        return parameters[0];
	    };
	    return true;
	})(typeof jQuery === 'function' ? jQuery : undefined);

	return pubsub;

})();
