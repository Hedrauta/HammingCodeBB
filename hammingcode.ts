
function sumOfParityBits(_lengthOfDBits: number) {
  return (_lengthOfDBits <= 2 || _lengthOfDBits == 0)
    ? ((_lengthOfDBits == 0) ? null : _lengthOfDBits + 1)
    : ((Math.ceil(Math.log2(_lengthOfDBits * 2))) <= Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits)))))
      ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
      : Math.ceil(Math.log2(_lengthOfDBits))
};

var test = {
  value: Math.round((Math.random() * (Math.pow(2, (4 + Math.round(Math.random()*53)))))),
  binary_value(){return this.value.toString(2)},
  binary_pBits(){return sumOfParityBits(this.binary_value().length)},
  data(){return this.binary_value().padStart(Math.pow(2, this.binary_pBits()) - (1+this.binary_pBits()), "0")}
}

function hamming_encode(_dataBits:string) {
  let sum_parity: number = sumOfParityBits(_dataBits.length)
  let data = _dataBits.split("")
  let build = []
  for (var i = 1; i<sum_parity; i++){
    if (i==1) {
      build.push("x","x");
      build.push(...data.splice(0, 1))
    }
    else {
      build.push("x");
      build.push(...data.splice(0, Math.pow(2, i)-1))
    }
  }
  return build
}

console.log(hamming_encode(test.data()).reduce(function(a,e,i) {if (e=="x") a.push(i); return a;}, []));
