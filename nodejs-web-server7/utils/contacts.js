const fs = require("fs");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data di contact.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase(),
  );
  return contact;
};

// menulis data / menimpah file contact.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// untuk menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama yang duplikat;
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filterContacts = contacts.filter((contact) => contact.nama !== nama);
  // console.log(filterContacts);
  saveContacts(filterContacts);
};

// mengubah contacts
const updateContact = (contactBaru) => {
  const contacts = loadContact();
  // hilangkan contact nama ynag namanya sama dengan oldNama
  const filterContacts = contacts.filter(
    (contact) => contact.nama !== contactBaru.oldNama,
  );
  // delete dulu oldNama karena tidak akan dikirm ke json kita itu hanya sebua validasi untuk mengetahui bahwa old sama new
  delete contactBaru.oldNama
  // setelah itu tambahkan ke sini 
  filterContacts.push(contactBaru);
  // terus timpah
  saveContacts(filterContacts);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
};
