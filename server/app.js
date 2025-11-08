const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "ecotrace",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal terkoneksi ke database");
  } else {
    console.log("Berhasil tekoneksi ke database");
  }
});

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Terhubung ke Express.JS" });
});

app.post("/api/register", async (req, res) => {
  const { noHP, nama, pass } = req.body;

  if (!noHP || !nama || !pass) {
    return res.status(400).json({ message: "Ada data yang kosong!" });
  }

  try {
    const hashedPass = await bcrypt.hash(pass, 10);

    const sql = "INSERT INTO users (noHP, nama, pass) VALUES (?, ?, ?)";

    db.query(sql, [noHP, nama, hashedPass], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Nomor HP Sudah terdaftar" });
        }
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server" });
      }
      res.status(201).json({ message: "Registrasi berhasil dilakukan" });
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan pada Server" });
  }
});

app.post("/api/login", async (req, res) => {
  const { noHP, pass } = req.body;

  if (!noHP || !pass) {
    return res.status(400).json({ message: "Terdapat data yang kosong" });
  }

  const sql = "SELECT * FROM users WHERE noHP = ?";

  db.query(sql, [noHP], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan Server :(" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Akun tidak ditemukan!" });
    }

    const user = result[0];

    const match = await bcrypt.compare(pass, user.pass);

    if (!match) {
      return res.status(401).json({ message: "Password salah!" });
    }

    res.json({ message: `Selamat Datang ${user.nama}`, user });
  });
});

app.listen(port, console.log(`Berjalan di port: ${port}`));
