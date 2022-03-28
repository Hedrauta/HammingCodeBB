
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



console.log(
  test.value, test.binary_value(), test.binary_pBits(), test.data()
  )
