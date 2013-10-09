# tab64 [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Encode/decode typed arrays (e.g. Float32Array, Uint8Array) to and from base64
strings.

## Usage ##

[![tab64](https://nodei.co/npm/tab64.png?mini=true)](https://nodei.co/npm/tab64)

### `tab64.encode(array)` ###

Takes a typed array of any format and returns a base64-encoded string.

### `tab64.decode(string[, type|output])` ###

Given a base64-encoded `string`, populate a typed array with the original
data's values.

`type` is a string [dtype](http://github.com/shama/dtype) which should match
the original data type you were using. It defaults to `uint8`, but if you
want to encode other types you'll need to pass this in or you'll get mangled
results. This example should work:

``` javascript
var data = new Float32Array([97, 98, 99])
var original = encode(data)
var copy = decode(data, 'float32') // [97, 98, 99]
```

Alternatively, you can pass a second `output` array instead of a `type` to push
data straight into that array.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/tab64/blob/master/LICENSE.md) for details.
