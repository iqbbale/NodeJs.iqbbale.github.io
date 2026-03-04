// template engine
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayout);
app.use(morgan("dev"));
// morgan itu digunakan untuk menulisakan log kedalam console, jadi kesannya sama kayak console.log

// build in middleware
// jika mau mengambil yang lain2 sepertimenambahkan element2 css/html/js cript dll
// maka harus ditaruh di folder public ini jika mengkuti tutorial di docsnya
// karena dengan diterapkah ini middlewarenya mengizinkan kita untuk menambahkan
// apa yang ada di dalamnya
// tanpa mengunakan middleware static ini apapun yang akan di tambahkan tidak akan perna terkirim
app.use(express.static("public"));

// application level middleware
// middleware bisa dibuat > 1
// dan hati2 dalam menyimpan middleware karena itu dibaca dari atas ke bawa
app.use((req, res, next) => {
  console.log(`Time : ${Date.now()}`);
  next(); //ditulis agar ekspresnya setelah dipakai/dijalankan ekspresnya akan bergerak/berpindah ke midleware berikutnya tergantung URL yang mana kita tulis
  // jangan lupa tulis nextnya soalnya jika tidak ditulis applicationnya akan lag hanging
});

// application level = router level
// bedany jika di application level itu instalnya itu ada di app
// jika di router maka simpannya di variable router

// kita juuga bisa anggap bahwa ini adalah mddleware yang mana kita mengirimkan sebuah request dan juga respinse
//dan nextnya yang paling bawa sendiri ketika pesan error kita

// aslinya didalam get ini suda mempunyai middleware , next
// tetapi kenapa ko baik2 saja soalnya setelah dijalankan maka applikasinya akan berhenti

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
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman contact",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`,
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});