// console.log("hello world")
const cetakNama = (nama) => `hai nama saya ${nama}`;
// // cetakNama("iqbal")
// // tetapi dengan export kita bisa mengambil file js yang lain agar menyambungkan
// // ini akan bisa digunakan oleh file manapun yang mana ketika file meminta sebuah require
module.exports = cetakNama;