var bcrypt = dcodeIO.bcrypt;
var salt = bcrypt.genSaltSync(5);
var hash = bcrypt.hashSync("B4c0/\/", salt);

console.log(salt);
console.log(hash);

var a = bcrypt.compareSync("B4c0/\/", hash); // true
var b = bcrypt.compareSync("not_bacon", hash); // falsebcryptFunc
console.log(a, b);
