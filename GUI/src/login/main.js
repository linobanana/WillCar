const submitButton = document.querySelector('.submit-button');
const bcrypt = dcodeIO.bcrypt;
const testValue = 'encrypt';
const testValueSalt = bcrypt.genSaltSync(5);
const testValueHash = bcrypt.hashSync(testValue, testValueSalt);

submitButton.addEventListener('click', function() {
  const password = document.querySelector("#password-field").value;
  let check = bcrypt.compareSync(password, testValueHash);
  console.log(check);
  if (check) {
    alert('correct');
  } else {
    alert('not correct');
  }
})


// var salt = bcrypt.genSaltSync(5);
// var hash = bcrypt.hashSync("linobanana", salt);
//
// console.log(salt);
// console.log(hash);
//
// var a = bcrypt.compareSync("B4c0/\/", hash); // true
// var b = bcrypt.compareSync("linobanana", hash); // false
// console.log(a, b);
