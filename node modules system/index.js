// di dalam terminal untuk memangil index cukup ketik  "node ."

// const nama = "iqbal";
// const cetakNama = (nama) => console.log(`ich heibe ${nama}`);
// cetakNama(nama)

// console.log(window)
// kenapa windo ga bisa soalnya di dalam node js ini sudah keluar dari windo
// didalma js sendiri tanpa node js ketika kita membuat function dengan nama yang sama
// dan di pangil di dalam file.js berbeda nama tersebut bisa muncul dan harus teliti dalam membuat nama, tetapi dengan node js
// itu tidak bisa di lakukan kecuali dengan require dan juga module.exports

// require('./coba');

// tetapi memangilnya harus dengan sebuah variabel let atau cont agar bisa di pangil
const cetakNama =  require('./coba')
// dengan reqire ini menjalankan yang coba dulu setelah itu baru index
console.log(cetakNama("iqbal"))
console.log("hello iqbal");

// ini mengambil yang lain itu tidak bisa karena js mengandung 1 module jadi tidak bisa di ambil module lain


