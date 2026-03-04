// const fs = require("fs");
import fs from "fs";
import chalk from "chalk";
import validator from "validator";

// const readLine = require("node:readline");
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readLine.createInterface({ input, output });

// import readline from "readline";
// import { stdin as input, stdout as output } from "node:process";
// const rl = readline.createInterface({ input, output });

// membuat folder "data" jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contact json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (ich) => {
//       resolve(ich);
//     });
//   });
// };

const simpanContact = (ich,noTlp,Email) => {
  const contact = {
    name: ich,
    noTlp,
    Email,
  };
  fs.readFile("data/contacts.json", "utf-8", (err, data) => {
    if (err) throw err;
    const contacts = data ? JSON.parse(data) : [];

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.name === ich);
    if (duplikat) {
      console.log(chalk.red.inverse.bold("contact sudah terdaftar"));
      return false;
    }

    // cek no hp
    if (!validator.isMobilePhone(noTlp, "id-ID")) {
      console.log(chalk.red.inverse.bold("noHp tidak valid"));
      return false;
    }

    // cek email
    if (Email) {
      if (!validator.isEmail(Email)) {
        console.log(chalk.red.inverse.bold("email tidak valid"));
        return false;
      }
    }

    contacts.push(contact);

    fs.writeFile("data/contacts.json", JSON.stringify(contacts), (e) => {
      if (e) throw e;
      console.log(chalk.bgGreen.blue.italic("succesfully"));
      // rl.close();
    });
  });
};

// untuk menampilkan list =
const listContact = () => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(data);

  console.log(chalk.cyan.inverse.bold("Daftar Contact:"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.noTlp}`);
  });
};

// menampilkan detail
const detailContact = (nama) => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(data);

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === nama.toLowerCase(),
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`));
    return false;
  }

  console.log(chalk.bgGreen.blue.italic(contact.name));
  console.log(contact.noTlp);
  if (contact.Email) {
    console.log(contact.Email);
  }
};

// menghapusContact
const deleteContact = (nama) => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(data);
  // didalam sini kita tidak akan menulis seperti di atas ynag find karena itu akan menghasilkan undifine yang mana akan mengangu
  // kita yang akan menduplikat arry tersebut enjadi nama2 baru yang tersedia dan yang namanya dihapus akan tidak ada atau hilang
  // kita pakai filter karena jika find itu penelusurannya berhenti di awal ketika di temukan ,jika filter maka ditemukan sampai selesai
  // dan kita tampung dengan newContacts agar membuat arry baru yang akan mengantikan arry yang lama
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== nama.toLowerCase(),
  );
  // jika namanya tidak ada namanya
  // pakai length agar mudah di baca namanya
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`));
    return false;
  }
  fs.writeFile("data/contacts.json", JSON.stringify(newContacts), (e) => {
      if (e) throw e;
      console.log(chalk.bgGreen.blue.italic(`data contact ${nama} berhasil dihapus`));
    })
};

// karna mengunakan es6 maka penulisannya 1 aja jika key dengan value sama
// jika key dengan value berbeda maka tulis beda
// module.exports = { tulisPertanyaan, simpanContact };
export { simpanContact, listContact, detailContact, deleteContact };