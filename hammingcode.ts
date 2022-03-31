
function sumOfParityBits(_lengthOfDBits: number) {
  return (_lengthOfDBits <= 2 || _lengthOfDBits == 0)
    ? ((_lengthOfDBits == 0) ? null : _lengthOfDBits + 1)
    : ((Math.ceil(Math.log2(_lengthOfDBits * 2))) <= Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits)))))
      ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
      : Math.ceil(Math.log2(_lengthOfDBits))
};

var test = {
  value: Math.round((Math.random() * (Math.pow(2, (4 + Math.round(Math.random() * 53)))))),
  binary_value() { return this.value.toString(2) },
  binary_pBits() { return sumOfParityBits(this.binary_value().length) },
  data() { return this.binary_value().padStart(Math.pow(2, this.binary_pBits()) - (1 + this.binary_pBits()), "0") }
}

function hamming_encode(_dataBits: string) {
  let _sum_parity: number = sumOfParityBits(_dataBits.length) // get the sum of needed parity bits
  let _data = _dataBits.split("") // create new array with the given data bits
  let _build = [] // init new array for building
  let count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0); // count specified data in the array, for later use

  _build.push("x", "x", ..._data.splice(0, 1)); // pre-build the "pre-build"

  for (let i = 2; i < _sum_parity; i++) { // add new paritybits and the corresponding data bits
    _build.push("x", ..._data.splice(0, Math.pow(2, i) - 1))
  }
  // "pre"-build my array, now the "calculation"... get the paritybits working
  for (let index of _build.reduce(function (a, e, i) { if (e == "x") a.push(i); return a; }, [])) {
    let _tempcount = index + 1; // set the "stepsize"
    let _temparray = []; // temporary array to store the corresponding bits
    let _tempdata = [..._build]; // copy the "build"
    while (_tempdata[index] !== undefined) { // as long as there are bits, do "cut"
      let _temp = _tempdata.splice(index, _tempcount * 2); // get x*2 bits, then
      _temparray.push(..._temp.splice(0, _tempcount)); // .. cut them and keep first half
    }
    _temparray.splice(0, 1); // remove first bit, which is the parity one
    _build[index] = ((count(_temparray, "1")) % 2.).toString() // simple count and remainder of 2 with "toString" to store it
  }
  _build.unshift(((count(_build, "1")) % 2.).toString()) // adding first index, which is done as last element
  return _build.join("") // return a string again
}
console.log(hamming_encode(test.data()))
