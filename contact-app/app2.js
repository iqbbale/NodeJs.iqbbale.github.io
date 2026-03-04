// new new new
// mengambil argument dari command line
// console.log(process.argv);
// di element ke 1 itu alamat nodenya
// ke 2 itu adalah alamat foldernya dimana
// ke (3) itu argument yang di ketik
// ke 4 itu handler yang mana fungsi yang akan kita lakukan
// console.log(process.argv[2]);
// jika gini berati yang di ambil ke berapa dari 1-berapa yang diingin kan

// mengambil argument dari command line
// kita buat biasa gini untuk pemangilan di jsonnya atau file yang di ingin kan
// const command = process.argv[2];
// if(command === "add"){

// }else if(command === "remove"){

// }else if(command === "list"){

// }

// atau kita bisa mengunakan sebuah module yang ada di npm yang fungsinya untuk mengelola file kita
// pakai yargs
// bisa mmebantu untuk membuat command line interaktif dengan melakukan parsing / membaca argument secara elegant
// const yargs = require("yargs");

// console.log(yargs.argv);
// cara pembuatan ".comand(cmd,desc,[builder],[handler]"
// cmd(command) = itu perintah kayak remove/add/list dll,
// des = deskripsi,
// builder = inin untuk menjalankan function atau buldernya melakukan apapun disini maunya apa
// handler =  ini adalah fungsi yang akan kita kasi tau fungsi yang kita jalankan yang mana ini menerima parameter argv-nya

// process.argv adalah array (daftar) yang berisi semua argument yang dikirim saat kita menjalankan Node.js dari terminal.
// process adalah object global di Node.js (tidak perlu import).
// argv artinya:
// argument vector (daftar argument)

// coba chtgbt

// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// yargs(hideBin(process.argv)).command(
//   "$0",
//   "Penjumlahan 2 angka",
//   (yargs) => {
//     return yargs
//       .option("a", {
//         type: "number",
//         demandOption: true,
//         describe: "angka pertama",
//       })
//       .option("b", {
//         type: "number",
//         demandOption: true,
//         describe: "angka ke 2",
//       });
//   },
//   (argv) => {
//     const hasil = argv.a + argv.b;
//     console.log("Hasil : " + hasil);
//   },
// ).parse();

// coba end

// lanjut pak sandika

// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// yargs(hideBin(process.argv))
//   .command(
//     "add",
//     "menambahkan contact baru",
//     () => {},
//     (argv) => {
//       console.log(argv);
//     },
//   )
//   .parse();

// // kita akan bikin agar comandnya tidak menerima satuan kita akan bikin dia parametrnya adalah object
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// yargs(hideBin(process.argv)).command({
//   command: "add",
//   describe: "menambahkan contact baru",
//   builder: {
//     nama: {
//       describe: "nama lengkap",
//       demandOption: true,
//       type: "string",
//     },
//     email: {
//       describe: "email",
//       demandOption: false,
//       type: "string",
//     },
//     noHp: {
//       describe: "nomor telephon",
//       demandOption: true,
//       type: "string",
//     },
//   },
//   handler(argv) {
//     const contact = {
//       nama: argv.nama,
//       email: argv.email,
//       noHp: argv.noHp,
//     };
//     console.log(contact);
//   },
// }).parse()
// // tulis node app2 add --help = untuk membantu membaca isinya mau di pangil bagaimana

// sambungin ke contacts utuk di kirim ke json
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// import * as contacts from "./contacts.js";
import {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} from "./contacts.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "nomor telephon",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      //   contacts.simpanContact(argv.nama, argv.email, argv.noHp);
      simpanContact(argv.nama, argv.noHp, argv.email);
    },
  })
  // // menampilkan daftar semua nama & no hp contact
  .command({
    command: "list",
    describe: "menampilkan semua nama & no hp contacts",
    handler() {
      listContact();
    },
  })
  // // menampilkan daetail sebuah contact
  .command({
    command: "detail",
    describe: "menampilkan detail sebuah contact berdasarkan nama",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    },
  })
  // menghapus contact berdasarkan nama
  .command({
    command: "delete",
    describe: "menghapus sebuah contact berdasarkan nama",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    },
  })
  // demand comand itu untuk memberi tahu perintah harus ada add/lainnya-nya
  .demandCommand()
  .parse();

// // .parse() = Membaca add Mencari command bernama "add" Menjalankan handler Mengirimkan argv ke dalam handler