// Rust binary import
const { uuid } = require('./index.node')

const { randomBytes } = require('crypto')

// Example: 1cbf5655eeb58bf905f4b1958ad0b71a2855
const inputStrings = Array.from({ length: 2 }, () => randomBytes(18).toString('hex'))

const hash = uuid(inputStrings[0])
console.log(hash)

const hash2 = uuid(inputStrings[1])
console.log(hash2)

const hash3 = uuid()
console.log(hash3)

const hash4 = uuid()
console.log(hash4)
