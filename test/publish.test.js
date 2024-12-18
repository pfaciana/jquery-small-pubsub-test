import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('action', () => {

	let count = 0;

	const callback = () => ++count;

	expect(count).toStrictEqual(0);

	$.publish('b'); // NOTE: no subscribers at this point

	expect(count).toStrictEqual(0);

	$.subscribe('a', callback);
	$.subscribe('a', callback);
	$.subscribe('a', callback);

	$.publish('a');

	expect(count).toStrictEqual(3);

	$.publish('a');
	$.publish('b'); // NOTE: no subscribers at this point
	$.publish('a');

	expect(count).toStrictEqual(9);

	$.publish('b'); // NOTE: no subscribers at this point

	expect(count).toStrictEqual(9);

	$.subscribe('b', callback);

	$.publish('b');

	expect(count).toStrictEqual(10);

});