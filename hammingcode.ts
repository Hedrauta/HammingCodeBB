
export function sumOfPBits(_lengthOfDBits: number) {
  return (_lengthOfDBits <= 2 || _lengthOfDBits == 0)
    ? ((_lengthOfDBits == 0) ? null : _lengthOfDBits + 1)
    : ((Math.ceil(Math.log2(_lengthOfDBits * 2))) <= Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits)))))
      ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
      : Math.ceil(Math.log2(_lengthOfDBits))
};

var test2: number = Math.round((Math.random() * (Math.pow(2, (4 + Math.round(Math.random()*53))))));
var bin_test2_data:string = test2.toString(2).padStart(
  ((Math.pow(2, (sumOfPBits(test2.toString(2).length)))-(1+sumOfPBits(test2.toString(2).length))))
  , "0");
var bin_test2_parity:number = sumOfPBits(bin_test2_data.length)
var test2_enc:Object = []




console.log(test2, bin_test2_data, bin_test2_data.length, bin_test2_parity)
