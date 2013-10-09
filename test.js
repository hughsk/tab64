var encode = require('./').encode
var decode = require('./').decode
var test = require('tape')

var uint8Data = new Uint8Array(numbers('hello world'))
var floatData = new Float32Array(numbers('hello world'))

test('uint8 data', function(t) {
  var b64value = 'aGVsbG8gd29ybGQ='
  t.equal(encode(uint8Data), b64value)
  t.equal(denumber(decode(b64value)), 'hello world')
  t.end()
})

test('float32 data', function(t) {
  var b64value = 'AADQQgAAykIAANhCAADYQgAA3kIAAABCAADuQgAA3kIAAORCAADYQgAAyEI='
  t.equal(encode(floatData), b64value)
  t.equal(denumber(decode(b64value, 'float32')), 'hello world')
  t.end()
})

function numbers(str) {
  return str.split('').map(function(c) {
    return c.charCodeAt(0)
  })
}

function denumber(arr) {
  var str = ''
  for (var i = 0; i < arr.length; i += 1) {
    str += String.fromCharCode(arr[i])
  }
  return str
}
