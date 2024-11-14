import { increment, incrementAll } from './module'

test('increment a number', () => {
  expect(increment(1)).toBe(2)
})

test('increment a list of numbers', () => {
  expect(incrementAll([1, 2, 3])).toStrictEqual([2, 3, 4])
})
