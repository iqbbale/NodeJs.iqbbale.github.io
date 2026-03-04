// const fs = require("fs");

// const readLine = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readLine.createInterface({ input, output });

// // membuat folder "data" jika belum ada
// const dirPath = "./data";
// if (!fs.existsSync(dirPath)) {
//   fs.mkdirSync(dirPath);
// }

// // membuat file contact json jika belum ada
// const dataPath = "./data/contacts.json";
// if (!fs.existsSync(dataPath)) {
//   fs.writeFileSync(dataPath, "[]", "utf-8");
// }

// // not so efficient

// // const pertanyaan1 = () => {
// //   return new Promise((resolve, reject) => {
// //     rl.question("wie heibe du ? ", (ich) => {
// //       resolve(ich);
// //     });
// //   });
// // };

// // const pertanyaan2 = () => {
// //   return new Promise((resolve, reject) => {
// //     rl.question("no Hp : ", (noHp) => {
// //       resolve(noHp);
// //     });
// //   });
// // };

// // more efficient

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (ich) => {
//       resolve(ich);
//     });
//   });
// };

// const main = async () => {
//   const ich = await tulisPertanyaan("wie heibee du ? ");
//   const noTlp = await tulisPertanyaan("nicht bitte sie : ");
//   const Email = await tulisPertanyaan("wie email : ");
//   const contact = {
//     name: ich,
//     noHp: noTlp,
//     email: Email,
//   };
//   fs.readFile("data/contacts.json", "utf-8", (err, data) => {
//     if (err) throw err;
//     const contacts = data ? JSON.parse(data) : [];
//     contacts.push(contact);

//     fs.writeFile("data/contacts.json", JSON.stringify(contacts), (e) => {
//       if (e) throw e;
//       console.log("succesfully");
//       rl.close();
//     });
//   });
// };

// main();


// yang kali ini untuk agar setiap tulisan memisalhkan

// // const contacts = require('./contacts');
// // jika mau lebih keren pakai object destrukturing
// const { tulisPertanyaan, simpanContact } = require("./contacts");
// const main = async () => {
//   //   const ich = await contacts.tulisPertanyaan("wie heibee du ? ");
//   //   const noTlp = await contacts.tulisPertanyaan("nicht bitte sie : ");
//   //   const Email = await contacts.tulisPertanyaan("wie email : ");

//   //   contacts.simpanContact(ich,noTlp,Email);

//   const ich = await tulisPertanyaan("wie heibee du ? ");
//   const noTlp = await tulisPertanyaan("nicht bitte sie : ");
//   const Email = await tulisPertanyaan("wie email : ");

//   simpanContact(ich, noTlp, Email);
// };

// main();