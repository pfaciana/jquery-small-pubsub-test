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
	newValue = $.publish('a');
	expect(newValue).toStrictEqual(1);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(1);

	$.subscribe('a', callbacks[1]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(2);

	$.subscribe('a', callbacks[2]);
	newValue = $.publish('a', 0);
	expect(newValue).toStrictEqual(3);

	newValue = $.publish('b', 0); // NOTE: no subscribers for b
	expect(newValue).toStrictEqual(0);

	const noValue = $.publish('c'); // NOTE: no subscribers for c
	expect(noValue).toStrictEqual(undefined);

});