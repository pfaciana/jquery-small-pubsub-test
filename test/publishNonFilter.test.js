import { test, expect } from 'vitest'
import jsdom from 'jsdom'
import jquery from 'jquery'

global.jQuery = global.$ = jquery((new jsdom.JSDOM('')).window)
const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('filter', () => {

	var sendValue = 'some string';

	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
		return receiveValue;
	});

});
test('non-filter (action)', () => {

	var sendValue = 'some string';

	$.publish('a', sendValue);

	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});
	$.subscribe('a', receiveValue => {
		expect(receiveValue).toStrictEqual(sendValue);
	});

	$.publish('a', sendValue);

});