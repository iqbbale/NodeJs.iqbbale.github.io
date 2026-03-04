// cara mengunakan validator
const validator = require("validator");

// ini untuk memfalidasi email jika betul true, jika bukan email nanti akan mengembalikan false
// console.log(validator.isEmail("iqbal@gmail.c"));
// console.log(validator.isMobilePhone("085792152818", "id-ID"));
console.log(validator.isNumeric("08579215281s"));

// chalk gunanya untuk menghias tulisan terminal
// npm yang say agunakan untuk chalk v4.1.0
// kalo mau update ketik npm install -g npm to update!
const chalk = require("chalk");

// console.log(chalk.blue("hello world"))
// console.log(chalk.red.bgBlue("hello world"))
// console.log(chalk.italic.bgBlue.black("hello world"));
const pesan = chalk`Iqbal {bgRed kaya} dwi {bgBlue.red.italic best rich} rachmad`;
const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");

console.log(pesan);
console.log(error("Error!"));
console.log(warning("Warning"));

// nodemon untuk mengecek setiap perubahan pada node js secara live
// npm install nodemon; ini akan selalu dijalankan dan ketika terlihat stuct itu bukan stuct itu dimana noodemon berkerja agar tidak
// terulang kita dalam segi penulisan yang berulang, dengan nodemon kita tidak perlu ngetik di terminal contoh = node app, kita cuma 1x ketik nodemon langsung dikerjakan semua "
// dengan nodemon maka akan memudahkan kita dalam menganalisah suatu project agar tidak menunguu untuk dipangiil
// tetapi dalma nodemoon maka dia hanya melihat pada perubahan di node app.js tidak ke arah yang lain
// nodemon ini ketika mau di deploy ke local kita dan deploy ke app kita dan pasti pingin mengunaakan nodemod, maka harus di install berbeda tidak bisa global harus di install secara local
// ctrl C untuk keluar
// to install secara local tulis = npm install --save-dev nodemon
// dan ketika pakai yang local harus di seting di package.json local kita
// dan mangilnya sekarang bukan nodemon lagi tetapi, npm start karena saya taruh di start