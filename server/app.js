const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const val = require("validator");
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

// ADMIN QUERY

app.get("/api/get-user-all", (req, res) => {
  try {
    const sql = `SELECT nama, noHP, No_Pel, alamat, verif FROM users WHERE role = "user"`;

    db.query(sql, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server", succeed: false });
      }

      const data = result;

      res.json({
        data,
        succeed: true,
      });
    });
  } catch (err) {}
});

app.post("/api/confirm-acc", (req, res) => {
  const { No_Pel, noHP } = req.body;
  const sql = `UPDATE users SET verif = "yes", No_Pel = ? WHERE noHP = ?`;

  db.query(sql, [No_Pel, noHP], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada Server", succeed: false });
    }
    res.json({
      succeed: true,
    });
  });
});

// USER QUERY

app.get("/api/data-transaksi", (req, res) => {
  const { No_Pel } = req.query;
  try {
    const sql = `SELECT a.noHP, a.nama, b.pemakaian, b.biaya, b.stat FROM users AS a JOIN transaksi AS b ON a.noHP = b.noHP WHERE a.No_Pel = ?`;

    db.query(sql, [No_Pel], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server", succeed: false });
      }

      const data = result;

      res.json({
        message: "Data Berhasil ditemukan",
        data,
        succeed: true,
      });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada Server", succeed: false });
  }
});

app.post("/api/register", async (req, res) => {
  const { noHP, nama, pass, passConfirm } = req.body;

  if (!noHP || !nama || !pass || !passConfirm) {
    return res
      .status(400)
      .json({ message: "Ada data yang kosong!", succeed: false });
  }
  if (!val.isMobilePhone(noHP, "id-ID")) {
    return res
      .status(400)
      .json({ message: "Format Nomor HP salah", succeed: false });
  }
  if (pass.length < 8) {
    return res
      .status(400)
      .json({ message: "Password kurang panjang!", succeed: false });
  }
  if (!pass === passConfirm) {
    return res
      .status(400)
      .json({ message: "Password Tidak Match!", succeed: false });
  }

  try {
    const hashedPass = await bcrypt.hash(pass, 10);

    const sql = "INSERT INTO users (noHP, nama, pass) VALUES (?, ?, ?)";

    db.query(sql, [noHP, nama, hashedPass], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "Nomor HP Sudah terdaftar", succeed: false });
        }
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server", succeed: false });
      }
      res
        .status(201)
        .json({ message: "Registrasi berhasil dilakukan", succeed: true });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada Server", succeed: false });
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
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan Server :(", succeed: false });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "Akun tidak ditemukan!", succeed: false });
    }

    const user = result[0];

    const match = await bcrypt.compare(pass, user.pass);

    if (!match) {
      return res
        .status(401)
        .json({ message: "Password salah!", succeed: false });
    }

    res.json({ message: `Selamat Datang ${user.nama}`, user, succeed: true });
  });
});

app.listen(port, console.log(`Berjalan di port: ${port}`));
