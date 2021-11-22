import { uuid } from './index';

import { createHash, randomBytes } from 'crypto';

// Example: 1cbf5655eeb58bf905f4b1958ad0b71a2855
const inputStrings = Array.from({ length: 100000 }, () => randomBytes(18).toString('hex'))

const id = uuid()
console.log(id)

const id2 = uuid()
console.log(id2)

const id3 = uuid(inputStrings[0])
console.log(id3)

const id4 = uuid(inputStrings[1])
console.log(id4)

console.log('------------------------------------------------------')

let time = 0n
for (let i = 0; i < inputStrings.length - 1; i++) {
    const start = process.hrtime.bigint()
    uuid(inputStrings[i])
    const end = process.hrtime.bigint()
    time = time + (end - start)
}

console.log('Generate 100K uuid with input using Rust uuid function:')
const averageTime = time / 100000n
console.log('Average time in nanoseconds:', Number(averageTime), 'ns')
console.log('Average time in milliseconds:', Number((averageTime * 10000n) / 1000000n) / 10000, 'ms')
console.log('------------------------------------------------------')

function setCharAt(str: string, index: number, chr: string): string {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

let time2 = 0n
for (let i = 0; i < inputStrings.length - 1; i++) {
    const start2 = process.hrtime.bigint()
    let uuid = createHash('sha256').update(inputStrings[i]).digest('hex')
    let uuid2 = uuid.substring(0, 35)
    uuid2 = setCharAt(uuid2, 8, '-')
    uuid2 = setCharAt(uuid2, 13, '-')
    uuid2 = setCharAt(uuid2, 18, '-')
    uuid2 = setCharAt(uuid2, 23, '-')
    uuid2 = setCharAt(uuid2, 14, '4')
    uuid2 = setCharAt(uuid2, 19, '8')
    const end2 = process.hrtime.bigint()
    time2 = time2 + (end2 - start2)
}

console.log('Generate 100K uuid with input using JS uuid function:')
const averageTime2 = time2 / 100000n
console.log('Average time in nanoseconds:', Number(averageTime2), 'ns')
console.log('Average time in milliseconds:', Number((averageTime2 * 10000n) / 1000000n) / 10000, 'ms')
console.log('------------------------------------------------------')