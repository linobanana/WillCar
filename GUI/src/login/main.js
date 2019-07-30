function submitForm() {
  const bcrypt = dcodeIO.bcrypt;
  var password = document.querySelector("#password-field").value;
  password = bcrypt.hashSync(password);
  document.form.action='http://localhost:4200';
  document.form.submit();
}


// var salt = bcrypt.genSaltSync(5);
// var hash = bcrypt.hashSync("linobanana", salt);
//
// console.log(salt);
// console.log(hash);
//
// var a = bcrypt.compareSync("B4c0/\/", hash); // true
// var b = bcrypt.compareSync("linobanana", hash); // false
// console.log(a, b);
