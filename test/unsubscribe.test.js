import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('test', () => {

	const callbacks = [
		() => 1,
		() => 2,
		() => 3,
	];

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

	$.subscribe('a', callbacks[0]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.subscribe('a', callbacks[1]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.unsubscribe('a', callbacks[0]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.subscribe('a', callbacks[2]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(2);

	$.unsubscribe('a', callbacks[2]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(1);

	$.unsubscribe('a', callbacks[1]);

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);

});