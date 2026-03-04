// Core modules
// File System
const fs = require("fs");

// menulis string ke file secara sycronus
// writeFileSync = di dalam sini menyimpan 2 hal 1. merujuk ke arah nama filenya apa 2. datanya apa
// jika file tidak ditemukan dalam folder maka node js otomatis menambahkan file kedalam folder yang sama
// jika filenya sudah ada maka akan ditimpah
// fs.writeFileSync("test.txt", "hello world secara singcronus");

// jika foldernya yang dicari tidak ada maka tidak akan jalan karena ketika membuat folder itu beda perintah
// try {
//   fs.writeFileSync("data/test.txt", "hello world secara singcronus");
// } catch (err) {
//   console.log(err);
// }

// menulis string ke file secara asyncronus
// gaya callback
// fs.writeFile('data/test.txt', 'hello world secaea asycronus',(e)=>{
//     console.log(e)
// })

// membaca isi file syc
// fs.readFileSync('data/test.txt');
// kalo gitu aja ga dibaca maka simpen di variable
// const data = fs.readFileSync("data/test.txt");
// console.log(data); tapi jika console biasa maka itu tidak menjadi string menjadi buffer
// ketika mau string maka tambahkan toString()
// console.log(data.toString());

// ada cara ke 2 pakai optional agar tida memakai toString memakai up coding agar langsung menjadi latin
// const data = fs.readFileSync("data/test.txt", 'utf-8');
// console.log(data)

// // membaca untuk asncronus
// const data = fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log(data);

// readLine
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Masukan Nama/umur Anda : ", (nama) => {
//   console.log(`Thank you for your valuable feedback: ${nama}`);
//   rl.close();
// });

// rl.question("Masukan Nama/umur Anda : ", (nama) => {
//   rl.question("Masukan Umur Anda", (umur) => {
//     console.log(`terimakasi ${nama} sudah mengimputkan your ${umur}`);
//     rl.close();
//   });
// });

// ke json
// rl.question("Masukan Nama/umur Anda : ", (nama) => {
//   rl.question("Masukan Umur Anda : ", (umur) => {
//     const contact = {
//       nama: nama,
//       umur: umur,
//     };
//     const filebuffer = fs.readFileSync("data/contact.json", "utf-8");
//     const contacts = JSON.parse(filebuffer);
//     contacts.push(contact);

//     fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
//     console.log("thks yout date");
//     rl.close();
//   });
// });

// // more logic bismillah
// const readline = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readline.createInterface({ input, output });

// rl.question("wie heibee sie ? ", (ich) => {
//   rl.question("bitee widersoon sie : ", (ichBin) => {
//     const contact = {
//       name: ich,
//       repeatName: ichBin,
//     };
//     fs.readFile("data/contact.json", "utf-8", (err, data) => {
//       if (err) throw err;
//       const contacts = data ? JSON.parse(data) : [];
//       contacts.push(contact);
//       fs.writeFile("data/contact.json", JSON.stringify(contacts), (err) => {
//         if (err) throw err;
//         console.log("succesfull");

//         rl.close();
//       });
//     });
//   });
// });
