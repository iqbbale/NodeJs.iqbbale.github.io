import http from "http";
const port = 3000;
import fs from "fs";
// const server = http.createServer((req, res)=>{

// })

// // listen yang akan menjalankan webserver kita
// server.listen(3000,()=>{
//     console.log("Server is listening on port 3000")
// })

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "content-type": "text/html",
//     });

//     const url = req.url;
//     if (url === "/about") {
//       //   res.write("<h1>ini adalah halaman about</h1>");
//       fs.readFile("./about.html", "utf-8", (err, data) => {
//         if (err) {
//           res.writeHead(404);
//           res.write("error : file mot found");
//         } else {
//           res.write(data);
//         }
//         res.end();
//       });
//     } else if (url === "/contact") {
//       res.write("<h1>ini adalah halaman contact</h1>");
//     } else {
//       //   res.write("hello world");
//       fs.readFile("./index.html", "utf-8", (err, data) => {
//         if (err) {
//           res.writeHead(404);
//           res.write("error : file mot found");
//         } else {
//           res.write(data);
//         }
//         res.end();
//       });
//       //   res.end();
//     }
//     // res.write("hello world");
//     // res.end();
//   })
//   .listen(port, () => {
//     console.log("Server is listening on port 3000");
//   });

//  kenapa post 3000 karena tau bahwa port ini kosong tidak ada yang pakai, dan juga sudah menjadi standart web server sementara
//  yang mana port 0-6000 itu sudah ada yang pakai

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("error : file mot found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const url = req.url;
    switch (url) {
      case "/about":
        renderHTML("./about.html", res);
        break;
      case "/contact":
        renderHTML("./contact.html", res);
        break;
      default:
        renderHTML("./index.html", res);
    }

    // if (url === "/about") {
    //   //   res.write("<h1>ini adalah halaman about</h1>");
    //   renderHTML("./about.html", res);
    // } else if (url === "/contact") {
    //   renderHTML("./contact.html", res);
    //   //   res.write("<h1>ini adalah halaman contact</h1>");
    // } else {
    //   renderHTML("./index.html", res);
    // }
  })
  .listen(port, () => {
    console.log("Server is listening on port 3000");
  });
