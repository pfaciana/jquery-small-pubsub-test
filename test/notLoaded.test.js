import { test, expect } from 'vitest'

const isPubSubLoaded = (await import('../src/pubsub.js')).default

test('test', () => {
	expect(isPubSubLoaded).toStrictEqual(false)
})