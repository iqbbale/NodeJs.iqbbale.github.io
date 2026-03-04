const express = require("express");
const expressLayout = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts.js");

// body untuk menangkap apa yang sudah di isi dalam form validasi result untuk melihat apakah validasinya lolos atau tidak
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static("public"));
// di dalam urlencoded kasi {entended : true agar tidak muncul error di terminal, karena jika tidak dikasi ini akan muncul tulisan nanti di terminal}
// Syarat Wajib agar req.body Tidak Kosong (undefined) 
// Agar Express bisa membaca isi form tersebut,
//  Anda wajib memasang middleware "penerjemah" di bagian atas kode Anda. Jika tidak, req.body akan selalu bernilai undefined.
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
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
    msg : req.flash("msg"),
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
// app.post("/contact", (req, res) => {
//   console.log(req.body);
//   res.send("data berhasil dikirim");
// });
// // jika gitu doang datanya meskipun dikirim tidak akan masuk dan akan menghasilkan undefine
// // maka kita butuh suatu middleware yang namanya urlencode, yang mana dia itu adalah bawaan dari express

// // proses data contact v-2
// app.post("/contact", [
//   // tulisan yang di body harus sama persis dengan tulisan name di dalam form karena berpasangan dengan namenya
//   body("email").isEmail(),
//   body("nohp").isMobilePhone("id-ID"),
// ], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ error: errors.array() });
//   }
//   // addContact(req.body);
//   // res.redirect("/contact");
// });

// proses data contact v-3 j
// jika mau validasi untuk masagenya di ganti pakai 'check'
// ada 2 satu untuk mausk ke dalam name form satunya untuk validasi nama / memberitau errornya
app.post(
  "/contact",
  [
    // disini body akan memvalidasi apakah ada nama yang double
    // value itu adalah nama yang di imputkan ke dalam form
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
      // return res.status(400).json({ error: errors.array() });
      res.render("add-contact", {
        title: "form tambah data contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirimkan flash massage
      req.flash("msg", "data contact berhasil di tambahkan");
      res.redirect("/contact");
    }
  },
);

// perbedaan body dan check
// Fitur :              body('nama')  ,check('nama')
// Mengecek Body? :         ,✅ Ya,      ✅ Ya
// Mengecek URL (Query)?,    ❌ Tidak,   ✅ Ya
// Mengecek URL (Params)?,   ❌ Tidak,   ✅ Ya
// Mengecek Cookies?,        ❌ Tidak,   ✅ Ya
// Penggunaan Umum :    Validasi Input Form, Validasi Umum/Fleksibel


// jika mau menambah tulis routenya di atas ini agar tidak berjalan ke arah sini dulu
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
