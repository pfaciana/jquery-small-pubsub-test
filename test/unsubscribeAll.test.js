import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('test', () => {

	$.subscribe('a', () => 1);
	$.subscribe('b', () => 1);
	$.subscribe('a', () => 2);
	$.subscribe('a', () => 3);
	$.subscribe('b', () => 2);

	expect($.getSubscribedEvents('a').length).toStrictEqual(3);
	expect($.getSubscribedEvents('b').length).toStrictEqual(2);

	$.unsubscribeAll();

	expect($.getSubscribedEvents('a').length).toStrictEqual(0);
	expect($.getSubscribedEvents('b').length).toStrictEqual(0);
});