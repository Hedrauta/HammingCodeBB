
function sumOfParityBits(_lengthOfDBits: number) {
  return (_lengthOfDBits <= 2 || _lengthOfDBits == 0)
    ? ((_lengthOfDBits == 0) ? null : _lengthOfDBits + 1)
    : ((Math.ceil(Math.log2(_lengthOfDBits * 2))) <= Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits)))))
      ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
      : Math.ceil(Math.log2(_lengthOfDBits))
};

var test = {
  value: Math.round((Math.random() * (Math.pow(2, (4 + Math.round(Math.random() * 16)))))),
  binary_value() { return this.value.toString(2) }
}
console.log("Value:", test.value)
console.log("binary:", test.binary_value())
console.log("length:", test.binary_value().length)
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

console.log(hamming_encode(test.binary_value()))
let test2 = hamming_encode(test.binary_value())
let test2_arr = test2.split("")
let random: number = Math.round(Math.random() * 1)
if (true) {
  let ran_ind: number = Math.round(Math.random() * test2_arr.length)
  console.log("altered at Index:", ran_ind)
  test2_arr[ran_ind] = (test2_arr[ran_ind] == "0") ? "1" : "0"
}
test2 = test2_arr.join("")

console.log(test2)

function hamming_decode(_data: string) {
  let _build = _data.split(""); // ye, an array again
  let _testArray = [];  //for the "tests". if any is false, it is been altered data, will check and fix it later
  let _sum_parity = Math.ceil(Math.log2(_data.length)); // excluding first bit
  console.log(_sum_parity)
  let count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0); // count.... again ;)
  let _overallParity = _build.splice(0, 1).join(""); // remove first index, for checking and to use the _build properly later
  _testArray.push((_overallParity == (count(_build, "1") % 2).toString()) ? true : false); // checking the "overall" parity
  for (var i = 0; i < _sum_parity; i++) {
    let _tempIndex = Math.pow(2, i) - 1 // get the parityBits Index
    let _tempStep = _tempIndex + 1 // set the stepsize
    let _tempData = [..._build] // "copy" the build-data
    let _tempArray = [] // init empty array for "testing"
    while (_tempData[_tempIndex] != undefined) { // extract from the copied data until the "starting" index is undefined
      var _temp = [..._tempData.splice(_tempIndex, _tempStep * 2)] // extract 2*stepsize
      _tempArray.push(..._temp.splice(0, _tempStep))  // and cut again for keeping first half
    }
    let _tempParity = _tempArray.shift() // and cut the first index for checking with the rest of the data
    _testArray.push(((_tempParity == (count(_tempArray, "1") % 2).toString())) ? true : false) // is the _tempParity the calculated data?
  }
  let _fixIndex: number = 0; // init the "fixing" index amd start with -1, bc we already removed the first bit
  for (let i = 1; i < _sum_parity + 1; i++) {
    _fixIndex += (_testArray[i]) ? 0 : (Math.pow(2, i) / 2)
  }
  console.log(_testArray)
  console.log(_fixIndex)
  _build.unshift(_overallParity)
  // fix the actual hammingcode if there is an error
  if (_fixIndex > 0 && _testArray[0] == false) {  // if the overall is false and the sum of calculated values is greater equal 0, fix the corresponding hamming-bit
    _build[_fixIndex] = (_build[_fixIndex] == "0") ? "1" : "0"
  }
  else if (_testArray[0] == false) { // otherwise, if the the overall_parity is only wrong, fix that one
    _overallParity = (_overallParity == "0") ? "1" : "0"
  }
  else if (_testArray[0] == true && _testArray.some((truth) => truth == false)) {
    return false // uhm, there's some strange going on... 2 bits are altered?
  }
  // oof.. halfway through... we fixed the altered bit, now "extract" the parity from the build and parse the binary data
  console.log(_build.join(""))
  for (var i = _sum_parity; i >= 0; i--) { // start from the last parity down the starting one
    _build.splice(Math.pow(2, i), 1)
  }
  _build.splice(0, 1)
  console.log(_build.join(""))
  return parseInt(_build.join(""), 2)
}
console.log(hamming_decode(test2))