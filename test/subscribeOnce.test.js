import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('action', () => {

	let count = 0;

	const callbacks = [
		() => ++count,
		() => ++count,
		() => ++count,
		() => ++count,
		() => ++count,
	];

	expect(count).toStrictEqual(0);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribeOnce('a', callbacks[0]);
	$.subscribeOnce('a', callbacks[1]);
	$.subscribeOnce('a', callbacks[2]);

	expect(count).toStrictEqual(0);
	expect($.getSubscribedEvents('a').length).toStrictEqual(3);

	$.publish('a');

	expect(count).toStrictEqual(3);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribeOnce('a', callbacks[3]);
	$.subscribeOnce('a', callbacks[4]);

	expect(count).toStrictEqual(3);
	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.publish('a');

	expect(count).toStrictEqual(5);
	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

});