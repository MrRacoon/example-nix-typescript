import * as R from 'ramda'
import { incrementAll } from './module'

console.log('It works!')
console.log("Look! Here's data too!")

const ans = incrementAll([19, 23, 42])

console.log(ans)
