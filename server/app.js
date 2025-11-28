const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const val = require("validator");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

const upload = multer();
const app = express();
const port = 5000;

const supabase = createClient(
  "https://jypykbtfrbxpvziieqpo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cHlrYnRmcmJ4cHZ6aWllcXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzcxNTEwMSwiZXhwIjoyMDc5MjkxMTAxfQ.rng7SOegoGWyKoQ186nrZ7KNxZFUe5-3j5U1E086r3o"
);

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

app.post("/api/add-tagihan-user", (req, res) => {
  const { invoice, No_Pel, time, pem_awal, pem_akhir, biaya } = req.body;

  if (!invoice || !No_Pel || !time || !pem_awal || !pem_akhir || !biaya) {
    return res
      .status(400)
      .json({ message: "Ada data kosong!", succeed: false });
  }

  try {
    const pemakaian = pem_akhir - pem_awal;
    const sql = `INSERT INTO transaksi (invoice, No_Pel, pemakaian, biaya, pem_awal, pem_akhir, waktu) VALUES (?,?,?,?,?,?,?)`;

    db.query(
      sql,
      [invoice, No_Pel, pemakaian, biaya, pem_awal, pem_akhir, time],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ message: "Invoice Sudah terdaftar", succeed: false });
          }
          return res
            .status(500)
            .json({ message: "Terjadi kesalahan pada Server", succeed: false });
        }
        res
          .status(201)
          .json({ message: "Tagihan Berhasil dilakukan", succeed: true });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada Server", succeed: false });
  }
});

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
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada Server", succeed: false });
  }
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

app.get("/api/get-tagihan-all-user", (req, res) => {
  const sql = `SELECT a.noHP, a.nama, b.invoice, b.pemakaian, b.biaya, b.stat, b.No_Pel, b.url_bukti, b.pem_awal, b.pem_akhir, DATE_FORMAT(b.waktu, '%M') AS bulan FROM users AS a JOIN transaksi AS b ON a.No_Pel = b.No_Pel ORDER BY b.No_Pel, b.waktu DESC`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada Server", succeed: false });
    }

    const data = result;
    res.json({ succeed: true, data });
  });
});

app.post("/api/confirm-pay", (req, res) => {
  const { invoice } = req.query;

  const sql = `UPDATE transaksi SET stat = "lunas" WHERE invoice = ?`;
  db.query(sql, [invoice], (err) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Gagal Approve Transaksi", succeed: false });
    }

    res.status(200).json({
      message: "Berhasil Approve Transaksi",
      succeed: true,
    });
  });
});

app.delete("/api/decline-acc/:noHP", (req, res) => {
  const { noHP } = req.params;

  const sql = `DELETE FROM users WHERE noHP = ?`;
  db.query(sql, [noHP], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal terhubung database!", succeed: false });
    }

    res.status(200).json({ message: "Akun ditolak!", succeed: true });
  });
});

app.delete("/api/delete-trans-acc/:No_Pel", (req, res) => {
  const { No_Pel } = req.params;

  const sql = `DELETE FROM transaksi WHERE No_Pel = ?`;

  db.query(sql, [No_Pel], (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

app.delete("/api/delete-acc/:No_Pel", (req, res) => {
  const { No_Pel } = req.params;

  const sql = `DELETE FROM users WHERE No_Pel = ?`;

  db.query(sql, [No_Pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }

    res.status(200).json({ message: "Berhasil hapus akun", succeed: true });
  });
});

app.post("/api/his-confirm", (req, res) => {
  const { text } = req.body;

  const sql = `INSERT INTO history (hal) VALUES (?)`;
  db.query(sql, [text], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal terkoneksi", succeed: false });
    }
    res.status(200).json({ message: "Berhasil input history", succeed: true });
  });
});

app.post("/api/his-acc-conf", (req, res) => {
  const { text, No_Pel } = req.body;

  const sql = `INSERT INTO history (hal, No_Pel) VALUES (?,?)`;
  db.query(sql, [text, No_Pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }

    res.status(200).json({ message: "Berhasil", succeed: true });
  });
});

app.get("/api/history-all", (req, res) => {
  const sql = `SELECT * FROM history`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal terkoneksi", succeed: false });
    }

    const formatted = result.map((item) => {
      const tanggal = new Date(item.tanggal); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });
    res.status(200).json({ succeed: true, result: formatted });
  });
});

// USER QUERY

app.post("/api/upload-bayar", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ message: "Belum menyertakan bukti", succeed: false });
  }

  const fileName = Date.now() + "-" + file.originalname;

  const { data, error } = await supabase.storage
    .from("Ecotrace")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    return res
      .status(500)
      .json({ message: "Gagal input data!", succeed: false });
  }

  const { data: publicUrl } = supabase.storage
    .from("Ecotrace")
    .getPublicUrl(fileName);

  return res.json({
    url: publicUrl.publicUrl,
    succeed: true,
    message: "Berhasil input data!",
  });
});

app.get("/api/data-transaksi", (req, res) => {
  const { No_Pel } = req.query;
  try {
    const sql = `SELECT a.noHP, a.nama, b.pem_awal, b.pem_akhir, b.invoice, b.pemakaian, b.biaya, b.stat, b.No_Pel, a.alamat, b.url_bukti, DATE_FORMAT(b.waktu, '%M') AS bulan FROM users AS a JOIN transaksi AS b ON a.No_Pel = b.No_Pel WHERE a.No_Pel = ? ORDER BY b.waktu DESC`;

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

app.post("/api/update-profile", async (req, res) => {
  const { nama, noHP, pass, alamat, noHPprev, passprev } = req.body;

  if (!nama || !noHP) {
    return res
      .status(400)
      .json({ message: "Kolom Nama dan Nomor Telepon tidak boleh kosong!" });
  }

  if (!pass) {
    const sql = `UPDATE users SET nama = ?, noHP = ?, pass = ?, alamat = ? WHERE noHP = ?`;
    db.query(sql, [nama, noHP, passprev, alamat, noHPprev], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server", succeed: false });
      }

      res.status(200).json({ message: "Berhasil update data", succeed: true });
    });
  } else {
    const hashedPass = await bcrypt.hash(pass, 10);
    const sql = `UPDATE users SET nama = ?, noHP = ?, pass = ?, alamat = ? WHERE noHP = ?`;
    db.query(sql, [nama, noHP, hashedPass, alamat, noHPprev], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada Server", succeed: false });
      }

      res.status(200).json({ message: "Berhasil update data", succeed: true });
    });
  }
});

app.get("/api/history-by-NoPel", (req, res) => {
  const { No_Pel } = req.query;

  const sql = `SELECT * FROM history WHERE No_Pel = ?`;
  db.query(sql, [No_Pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal terkoneksi", succeed: false });
    }

    const formatted = result.map((item) => {
      const tanggal = new Date(item.tanggal); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });
    res.status(200).json({ succeed: true, result: formatted });
  });
});

// ALL ROLE

app.post("/api/update-status-tagihan", async (req, res) => {
  const { invo, url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ message: "URL tidak terbuat!", succeed: false });
  }

  const sql = `UPDATE transaksi SET stat = "pending", url_bukti = ? WHERE invoice = ?`;
  db.query(sql, [url, invo], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada Server", succeed: false });
    }
    res
      .status(201)
      .json({ message: "Pembayara berhasil dilakukan", succeed: true });
  });
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
  if (pass !== passConfirm) {
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
