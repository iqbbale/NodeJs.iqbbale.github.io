// ini pakai express kita bandingkan mana yang lebih mudah
const express = require("express");
const app = express();
const port = 3000;

// root = itu halaman utama
// yang "/" itu root
// route itu ynag bawa ini yang di jalankan

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama : "iqbal",
  //   email : "iqba;@gmail.com",
  //   noHp : "099201",
  // })
  // cara penulisan send("pathnya mana", rootnya)
  // root disini maksutnya didalam foldernya mana nah aku pakai di dalam folser nodejs-web-server2 jadi itu mengarah kesitu
  // yang mana sudah relative pada root-nya
  // sendFile juga bisa digunakan untuk mengambil elemnt yang statik contohnya isi file css menampilkan gambar/pdf
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("Ini World! About");
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  // res.send("Hello World! Contact");
  res.sendFile("./contact.html", { root: __dirname });
});

// app.get("/product/:id/category/:idCat", (req, res) => {
//   res.send(
//     `Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`,
//   );
// });
app.get("/product/:id", (req, res) => {
  res.send(
    // saat mengunaan query sampingnya tulis namanya/categorynya
    // terus tulis di url di sampingnya product seoerti ini 
    // localhost:3000/product/20?category=namanya terserah
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`,
  );
});

// jika begini maka test yang dibawa ini akan jalan di request apapun di dalam browser
// tapi jangan di taruh paling atas karena akan di cegat oleh fungsi ini
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
