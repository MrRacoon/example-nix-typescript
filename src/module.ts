import * as R from 'ramda'

export const increment = (n: number) => n + 1
export const incrementAll = R.map(increment)
