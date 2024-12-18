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

	$.subscribe('a', callbacks[0]);
	$.subscribe('a', callbacks[1]);
	$.subscribeOnce('a', callbacks[2]);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.unsubscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

});