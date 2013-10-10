// Original implementation sourced via:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#Appendix.3A_Decode_a_Base64_string_to_Uint8Array_or_ArrayBuffer

var dtype = require('dtype')
var ceil = Math.ceil

module.exports.encode = encode
module.exports.decode = decode

function b64int(n) {
  return n < 26 ? n + 65
    : n < 52 ? n + 71
    : n < 62 ? n - 4
    : n === 62 ? 43
    : n === 63 ? 47
    : 65
}

function intb64(chr) {
  return chr > 64 && chr < 91 ? chr - 65
    : chr > 96 && chr < 123 ? chr - 71
    : chr > 47 && chr < 58 ? chr + 4
    : chr === 43 ? 62
    : chr === 47 ? 63
    : 0
}

function encode(input) {
  if (!(input instanceof Uint8Array)) {
    input = new Uint8Array(input.buffer)
  }

  var length = input.length
  var output = ""

  for (var value = 0, idx = 0; idx < length; idx++) {
    var bit = idx % 3

    value |= input[idx] << (16 >>> bit & 24)
    if (idx > 0 && !((idx * 4 / 3) % 76)) {
      output += "\r\n"
    }

    if (bit === 2 || input.length - idx === 1) {
      output += String.fromCharCode(
          b64int(value >>> 18 & 63)
        , b64int(value >>> 12 & 63)
        , b64int(value >>> 6 & 63)
        , b64int(value & 63)
      )
      value = 0
    }
  }

  return output.replace(/A(?=A$|$)/g, "=")
}

function decode(input, output) {
  input = input.replace(/[^A-Za-z0-9\+\/]/g, "")

  var inputLength = input.length
  var outputLength = inputLength * 3 + 1 >> 2
  var outidx = 0
  var inidx = 0
  var rvalue

  if (!output) output = new Uint8Array(outputLength)
  if (typeof output === 'string') {
    var type = output
    var bytes = parseInt(type.match(/[0-9]+/g), 10) / 8
    var offset = ceil(outputLength / bytes) * bytes - outputLength
    if (bytes) outputLength += offset
    output = new Uint8Array(outputLength)
    rvalue = new (dtype(type))(output.buffer)
  } else {
    rvalue = output
  }

  for (var value = 0; inidx < inputLength; inidx++) {
    var bit = inidx & 3

    value |= intb64(
      input.charCodeAt(inidx)
    ) << (18 - 6 * bit)

    if (bit === 3 || inputLength - inidx === 1) {
      for (var sbit = 0; sbit < 3 && outidx < outputLength; sbit++) {
        output[outidx++] = value >>> (16 >>> sbit & 24) & 255
      }
      value = 0
    }
  }

  return rvalue
}
