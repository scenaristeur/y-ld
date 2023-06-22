import { encode, decode } from '@ipld/dag-json'
import { CID } from 'multiformats'

const obj = {
    x: 1,
    /* CID instances are encoded as links */
    y: [2, 3, CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4')],
    z: {
        a: CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4'),
        b: null,
        c: 'string'
    }
}

let data = encode(obj)
let decoded = decode(data)
let dec = decoded.y[0] // 2
let inst = CID.asCID(decoded.z.a) // cid instance

console.log(dec, inst)

const empty = {}
let empty_encoded = encode(empty)
console.log('empty_encoded', empty_encoded)
let empty_decoded = decode(empty_encoded)
console.log("empty decoded", empty_decoded)
// let empty_CID = CID.asCID(empty)
// console.log("empty_CID", empty_CID)


// https://github.com/multiformats/js-multiformats
//import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'

const bytes = json.encode({ hello: 'world' })

const hash = await sha256.digest(bytes)
const cid = CID.create(1, json.code, hash)

console.log("CID", cid)




//https://github.com/multiformats/js-multiformats#creating-blocks
import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-cbor'
import { sha256 as hasher } from 'multiformats/hashes/sha2'

const value = { hello: 'world' }

// encode a block
let block = await Block.encode({ value, codec, hasher })

block.value // { hello: 'world' }
block.bytes // Uint8Array
block.cid   // CID() w/ sha2-256 hash address and dag-cbor codec

// you can also decode blocks from their binary state
block = await Block.decode({ bytes: block.bytes, codec, hasher })

// if you have the cid you can also verify the hash on decode
block = await Block.create({ bytes: block.bytes, cid: block.cid, codec, hasher })

console.log("block", block)