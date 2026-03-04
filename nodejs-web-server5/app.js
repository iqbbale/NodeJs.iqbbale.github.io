const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "iqbbalee",
      email: "iqbal@gmail.com",
    },
    {
      nama: "fafa",
      email: "fafa@gmail.com",
    },
    {
      nama: "rachmad",
      email: "rachmad@gmail.com",
    },
  ];
  res.render("index", {
    nama: "iqbal",
    title: "halaman home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman about",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Halaman contact",
    contacts,
    layout: "layouts/main-layout",
  });
});

app.get("/contact/:nama", (req, res) => {
  // params.nama itu mengarah padah yang atas yang namanya contact/:nama
  // :nama menjadi sebuah parameter
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Halaman detail contact",
    contact,
    layout: "layouts/main-layout",
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});