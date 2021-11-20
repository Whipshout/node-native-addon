import { uuid } from './index';

import { randomBytes } from 'crypto';

// Example: 1cbf5655eeb58bf905f4b1958ad0b71a2855
const inputStrings = Array.from({ length: 2 }, () => randomBytes(18).toString('hex'))

const id = uuid()
console.log(id)

const id2 = uuid()
console.log(id2)

const id3 = uuid(inputStrings[0])
console.log(id3)

const id4 = uuid(inputStrings[1])
console.log(id4)