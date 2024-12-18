import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('test', () => {
	let newValue;

	const callbacks = [
		() => 1,
		() => 2,
		() => 3,
	];

	$.subscribeOnce('a', 999, callbacks[2]);
	$.subscribe('a', callbacks[0]);
	$.subscribe('a', -999, callbacks[1]);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

	$.unsubscribe('a', callbacks[0]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.unsubscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(0);

});