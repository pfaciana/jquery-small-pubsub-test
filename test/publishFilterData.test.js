import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('test', () => {
	let newValue;

	const callbacks = [
		function () {
			return this.context;
		},
		function () {
			return this.context;
		},
		function () {
			return this.context;
		},
		function () {
			return this();
		},
		function () {
			return this(this.context);
		},
	];

	const callbackWithoutContext = function () {
		return 4;
	};
	callbackWithoutContext.priority = 99999;

	const callbackWithContext = function (context) {
		return context;
	};
	callbackWithContext.context = 5;

	$.subscribeOnce('a', {priority: 999, context: 3}, callbacks[2]);
	$.subscribe('a', {context: 1}, callbacks[0]);
	$.subscribe('a', {priority: -999, context: 2}, callbacks[1]);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

	$.unsubscribe('a', callbacks[0]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.subscribeOnce('a', callbackWithoutContext, callbacks[3]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(4);

	$.unsubscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(0);

	$.subscribeOnce('a', callbackWithContext, callbacks[4]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(5);

});