const express = require("express");
const expressLayout = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contacts.js");

const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));

app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(flash());

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
    mahasiswa,
    title: "halaman home",
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
    msg: req.flash("msg"),
  });
});

// halaman form tambah data
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "From tambah data contact",
    layout: "layouts/main-layout",
  });
});

// // proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Terdaftar");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "form tambah data contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "data contact berhasil di tambahkan");
      res.redirect("/contact");
    }
  },
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404).send("<h1>404<h1>");
  } else {
    // res.send("oke")
    deleteContact(req.params.nama);
    req.flash("msg", "data contact berhasil di hapus");
    res.redirect("/contact");
  }
});

// halaman form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "From ubah data contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses ubah data
// nama ini sama seperti yang kita tulis di action pada edit-contact
// dalam method ini kita harus teliti dalam menambahkan karena jika salah bisa membuat kesalahan dalam pemasukan2 nama yang akan berakibat fatal
app.post(
  "/contact/update",
  // nama nya harus di validasi agak berbeda dengan validasi tambah
  // karena kita tidak hanya mengecek apakah nama sudah ada dalam json atau beluum
  // tetapi juga harus ngecek apakah nama yang dikirimkkan itu sama dengan nama lamanya atau tida
  // karena jika mau ganti email/nohpnya sama, jika mengunakan validasi lama yaitu tambah itu akan error, karena meskipun itu sudah bener sii nama iqbal itu sudah ada di dalam file jsonnya
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      // kita akan cek lagi selain duplikat, apakah nama yang dikirim kedalam value, value(itu nama baruu) itu sama tida dengan nama yang baru, jika sama maka lolos, jika beda dia akan di cek lagi
      // apakah duplikat atau tida dalam contact jsonnya,  jika namanya tidak berubah maka tidak apa2 soalnya mungkin yang di ubah cuma email / nohp
      // makanya kita tambahkan value !== req.body.oldNama
      // tapi di dalam body disini kita tidak punya akses ke dalam req, karena req baru bisa di akses di bawanya yang (req,res), tapi jika ingin mendapatkan asksesnya juga maka kita kiirm juga sebagai parameter sebagai validasinya
      // express validator memungkinkan itu asalkan mengirim object yang isinya { req }
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Terdaftar");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "form ubah data contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      // res.send(req.body);
      updateContact(req.body);
      req.flash("msg", "data contact berhasil diubah");
      res.redirect("/contact");
    }
  },
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
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