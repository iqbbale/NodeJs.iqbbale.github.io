// template engine
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
// ketika mengunakan ejs maka html-nya atau file yang di pangil bukan lagi mengunakan
// semisal index.html maka menjadi = index.ejs
app.use(expressLayout);

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
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
  // dengan begini kita mengirimkan nama ke index yang ada ejs nama
  res.render("index", {
    nama: "iqbal",
    title: "halaman home",
    mahasiswa,
    layout : 'layouts/main-layout'
  });
});

app.get("/about", (req, res) => {
  res.render("about", { 
    layout : 'layouts/main-layout', 
    title: "Halaman about" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { 
    layout : 'layouts/main-layout', 
    title: "Halaman contact" });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`,
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
