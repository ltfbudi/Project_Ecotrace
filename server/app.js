const express = require("express");
const mysql = require("mysql2");
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

const cors = require("cors");

const corsOptions = {
  origin: ["https://ecotrace.id", "https://www.ecotrace.id"],
  methods: "GET,POST,PUT,DELETE",
};

const db = mysql.createConnection({
  host: "103.163.138.168",
  user: "ecotrace_dataset",
  password: "Ec0tr4c3@131225",
  database: "ecotrace_ecotrace",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal terkoneksi ke database");
  } else {
    console.log("Berhasil tekoneksi ke database");
  }
});

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Terhubung ke Express.JS" });
});

// ADMIN QUERY

app.post("/api/buat-tagihan-langsung", (req, res) => {
  const { id_pel, bulan, tahun, pem_awal, pem_akhir, pemakaian, biaya } =
    req.body;

  const sql = `INSERT INTO transaksi (id_pel, bulan, tahun, pem_awal, pem_akhir, pemakaian, biaya, stat, stat_rev) VALUES (?,?,?,?,?,?,?,"lunas", "clear")`;

  db.query(
    sql,
    [id_pel, bulan, tahun, pem_awal, pem_akhir, pemakaian, biaya],
    (err) => {
      if (err) {
        return res.status(500).json({ succeed: false });
      }
      res.status(200).json({ succeed: true });
    }
  );
});

app.post("/api/add-tagihan-user", (req, res) => {
  const { invoice, id_pel, time, pem_awal, pem_akhir, biaya } = req.body;

  if (!invoice || !id_pel || !time || !pem_awal || !pem_akhir || !biaya) {
    return res
      .status(400)
      .json({ message: "Ada data kosong!", succeed: false });
  }

  try {
    const pemakaian = pem_akhir - pem_awal;
    const sql = `INSERT INTO transaksi (invoice, id_pel, pemakaian, biaya, pem_awal, pem_akhir, waktu) VALUES (?,?,?,?,?,?,?)`;

    db.query(
      sql,
      [invoice, id_pel, pemakaian, biaya, pem_awal, pem_akhir, time],
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
    const sql = `SELECT * FROM users WHERE role = "user"`;

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
  const { id_pel, noHP, clasify } = req.body;
  const sql = `UPDATE users SET verif = "yes", id_pel = ?, clasify = ? WHERE noHP = ?`;

  db.query(sql, [id_pel, clasify, noHP], (err, result) => {
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
  const sql = `SELECT a.noHP, a.nama, b.invoice, b.pemakaian, b.biaya, b.stat, b.id_pel, b.url_bukti, b.pem_awal, b.pem_akhir, DATE_FORMAT(b.waktu, '%M') AS bulan FROM users AS a JOIN transaksi AS b ON a.id_pel = b.id_pel ORDER BY b.id_pel, b.waktu DESC`;

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

app.delete("/api/delete-trans-acc/:id_pel", (req, res) => {
  const { id_pel } = req.params;

  const sql = `DELETE FROM transaksi WHERE id_pel = ?`;

  db.query(sql, [id_pel], (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

app.delete("/api/delete-acc/:id_pel", (req, res) => {
  const { id_pel } = req.params;

  const sql = `DELETE FROM users WHERE id_pel = ?`;

  db.query(sql, [id_pel], (err, result) => {
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
  const { text, id_pel } = req.body;

  const sql = `INSERT INTO history (hal, id_pel) VALUES (?,?)`;
  db.query(sql, [text, id_pel], (err, result) => {
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

app.post("/api/tambah-pemakaian-akhir", (req, res) => {
  const { id_pel } = req.body;

  if (!id_pel) {
  }
  const sql = `INSERT INTO pem_awal (id_pel, pemakaian) VALUES (?, 0)`;
  db.query(sql, [id_pel], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi!", succeed: false });
    }
    res.status(200).json({ succeed: true });
  });
});

app.get("/api/get-count-pending", (req, res) => {
  const sql = `SELECT COUNT(id_pel) AS jml FROM transaksi WHERE stat = "diajukan" OR stat = "revisi"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }
    const data = result;
    res
      .status(200)
      .json({ message: "Berhasil Menarik Data", succeed: true, data });
  });
});

app.get("/api/get-count-approve", (req, res) => {
  const sql = `SELECT COUNT(id_pel) AS jml FROM transaksi WHERE stat = "nunggak" OR stat = "pending" OR stat = "lunas"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }
    const data = result;
    res
      .status(200)
      .json({ message: "Berhasil Menarik Data", succeed: true, data });
  });
});

app.get("/api/get-count-sudah-bayar", (req, res) => {
  const sql = `SELECT COUNT(id_pel) AS jml FROM transaksi WHERE stat = "lunas"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }
    const data = result;
    res
      .status(200)
      .json({ message: "Berhasil Menarik Data", succeed: true, data });
  });
});

app.get("/api/get-count-belum-bayar", (req, res) => {
  const sql = `SELECT COUNT(id_pel) AS jml FROM transaksi WHERE stat = "pending"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal Terkoneksi", succeed: false });
    }
    const data = result;
    res
      .status(200)
      .json({ message: "Berhasil Menarik Data", succeed: true, data });
  });
});

app.get("/api/get-all-pending", (req, res) => {
  const sql = `SELECT a.nama, b.id_pel, a.alamat,b.id, b.bulan, b.tahun, a.email, b.url, b.waktu FROM transaksi AS b JOIN users AS a ON b.id_pel = a.id_pel  WHERE stat = "diajukan" ORDER BY b.bulan, b.tahun`;

  db.query(sql, (err, result) => {
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-noVerif", (req, res) => {
  const sql = `SELECT * FROM users WHERE role = "user" AND verif = "no"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }
    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-Verif", (req, res) => {
  const sql = `SELECT * FROM users WHERE role = "user" AND verif = "yes"`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }
    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/pengajuan-user-by-id", (req, res) => {
  const { id } = req.query;

  const sql = `SELECT * FROM transaksi WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.post("/api/give-revisi-pengajuan", (req, res) => {
  const { isiRevisi, id } = req.body;
  console.log(id);

  const sql = `UPDATE transaksi SET stat_rev = "yes", revisi = ? WHERE id = ?`;
  db.query(sql, [isiRevisi, id], (err) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

app.post("/api/approve-pengajuan-user", (req, res) => {
  const { id } = req.body;

  const sql = `UPDATE transaksi SET revisi = NULL, stat_rev="clear", stat="pending" WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

app.get("/api/get-all-approve", (req, res) => {
  const sql = `SELECT a.nama, b.id_pel, a.alamat,b.id,b.bulan, b.tahun, a.email, b.url, b.waktu FROM transaksi AS b JOIN users AS a ON b.id_pel = a.id_pel  WHERE stat = "pending" or stat="lunas" or stat="terbayar" ORDER BY b.bulan, b.tahun`;

  db.query(sql, (err, result) => {
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-all-bayar-pending", (req, res) => {
  const sql = `SELECT a.nama, b.id_pel, a.alamat,b.id,b.bulan, b.tahun, a.email, b.url, b.waktu FROM transaksi AS b JOIN users AS a ON b.id_pel = a.id_pel  WHERE stat = "pending" ORDER BY b.bulan, b.tahun`;

  db.query(sql, (err, result) => {
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-all-bayar-lunas", (req, res) => {
  const sql = `SELECT a.nama, b.id_pel, a.alamat, b.pemakaian, b.pem_awal, b.pem_akhir, b.biaya, b.id,b.bulan, b.tahun, a.email, b.url, b.waktu FROM transaksi AS b JOIN users AS a ON b.id_pel = a.id_pel  WHERE stat = "lunas" ORDER BY b.bulan, b.tahun`;

  db.query(sql, (err, result) => {
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-all-baru-bayar", (req, res) => {
  const sql = `SELECT a.nama, b.id_pel, a.alamat,b.id, b.bulan, b.tahun, a.email,b.pem_akhir, b.url, b.url_bukti,b.waktu FROM transaksi AS b JOIN users AS a ON b.id_pel = a.id_pel  WHERE stat = "terbayar" ORDER BY b.bulan, b.tahun`;

  db.query(sql, (err, result) => {
    const data = result.map((item) => {
      const tanggal = new Date(item.waktu); // ganti sesuai nama kolom

      const tgl = tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return { ...item, tanggal_format: tgl };
    });

    res.status(200).json({ succeed: true, data });
  });
});

app.post("/api/registradi-dari-admin", async (req, res) => {
  const { noHP, nama, pass, passConfirm, email, alamat, id_pel, clasify } =
    req.body;

  if (
    !noHP ||
    !nama ||
    !pass ||
    !passConfirm ||
    !email ||
    !alamat ||
    !clasify ||
    !id_pel
  ) {
    return res
      .status(400)
      .json({ message: "Ada data yang kosong!", succeed: false });
  }
  if (!val.isMobilePhone(noHP, "id-ID")) {
    return res
      .status(400)
      .json({ message: "Format Nomor HP salah", succeed: false });
  }
  if (!val.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Email tidak sesuai format", succeed: false });
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
    const sql = `INSERT INTO users (noHP, nama, pass, email, alamat, clasify, verif, id_pel) VALUES (?, ?, ?, ?, ?, ?, "yes", ?)`;

    db.query(sql, [noHP, nama, pass, email, alamat, clasify, id_pel], (err) => {
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

app.post("/api/approve/payment", (req, res) => {
  const { id } = req.body;

  const sql = `UPDATE transaksi SET stat = "lunas" WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

app.post("/update/pem-awal/user", (req, res) => {
  const { id_pel, pem_awal } = req.body;

  const sql = `UPDATE pem_awal SET pemakaian = ? WHERE id_pel = ?`;
  db.query(sql, [pem_awal, id_pel], (err) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    res.status(200).json({ succeed: true });
  });
});

// USER QUERY

app.get("/api/pem-awal", (req, res) => {
  const { pem_awal } = req.query;
  try {
    const sql = `SELECT pemakaian FROM pem_awal WHERE id_pel = ? ORDER BY pemakaian DESC`;
    db.query(sql, [id_pel], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Terjadi Kesalahan pada Server", succeed: false });
      }
      const data = result;
      res.status(200).json({ succeed: true, pemakaian: data });
    });
  } catch {}
});

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
  const { id_pel } = req.query;
  try {
    const sql = `SELECT a.noHP, a.nama, a.alamat,b.id, b.pem_awal, b.pem_akhir, b.pemakaian, b.biaya, b.stat, b.id_pel, a.alamat, b.url, b.bulan, b.tahun FROM users AS a JOIN transaksi AS b ON a.id_pel = b.id_pel WHERE a.id_pel = ? AND b.stat = "pending" ORDER BY b.bulan DESC, b.tahun DESC`;

    db.query(sql, [id_pel], (err, result) => {
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
  const {
    nama,
    noHP,
    passPrev,
    passNew,
    passNewConfirm,
    email,
    alamat,
    noHPprev,
    passRealPrev,
  } = req.body;

  if (!nama || !noHP) {
    return res
      .status(400)
      .json({ message: "Kolom Nama dan Nomor Telepon tidak boleh kosong!" });
  }

  if (!passPrev && !passNew && !passNewConfirm) {
    const sql = `UPDATE users SET nama = ?, noHP = ?, pass = ?, alamat = ? , email = ? WHERE noHP = ?`;
    db.query(
      sql,
      [nama, noHP, passRealPrev, alamat, email, noHPprev],
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Terjadi kesalahan pada Server", succeed: false });
        }

        res
          .status(200)
          .json({ message: "Berhasil update data", succeed: true });
      }
    );
  } else if (!passPrev || !passNew || !passNewConfirm) {
    return res.status(400).json({
      message: "Kolom Password tidak boleh ada yang kosong salah satu",
      succeed: false,
    });
  } else {
    if (passNew !== passNewConfirm) {
      return req.status(400).json({
        message: "Password Baru dan Confirmasinya tidak Sama !",
        succeed: false,
      });
    }
    const isMatch = passPrev === passRealPrev ? true : false;
    if (isMatch) {
      const sql = `UPDATE users SET nama = ?, noHP = ?, pass = ?, alamat = ?, email = ? WHERE noHP = ?`;
      db.query(sql, [nama, noHP, passNew, alamat, email, noHPprev], (err) => {
        if (err) {
          return res.status(500).json({
            message: "Terjadi kesalahan pada Server",
            succeed: false,
          });
        }

        res
          .status(200)
          .json({ message: "Berhasil update data", succeed: true });
      });
    } else {
      return res.status(400).json({
        message: "Password Lama yang Anda masukkan tidak sama!",
        succeed: false,
      });
    }
  }
});

app.get("/api/history-by-NoPel", (req, res) => {
  const { id_pel } = req.query;

  const sql = `SELECT * FROM history WHERE id_pel = ?`;
  db.query(sql, [id_pel], (err, result) => {
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

app.get("/api/pem-awal-id-pel", (req, res) => {
  const { id_pel } = req.query;

  const sql = `SELECT * FROM pem_awal WHERE id_pel = ?`;
  db.query(sql, [id_pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Message: "Gagal Terkoneksi!", succeed: false });
    }
    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.post("/api/upload-pengajuan-user", (req, res) => {
  const { pem_akhir, bulan, tahun, url, pem_awal, total, biaya, id_pel } =
    req.body;

  const sql = `INSERT INTO transaksi (id_pel, pemakaian, pem_awal, pem_akhir, biaya, url, stat, bulan, tahun) VALUES (?, ?, ?, ?, ?, ?, "diajukan", ?, ?)`;
  db.query(
    sql,
    [id_pel, total, pem_awal, pem_akhir, biaya, url, bulan, tahun],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Tidak Dapat terkoneksi", succeed: false });
      }

      res
        .status(200)
        .json({ message: "Berhasil Menambahkan data!", succeed: true });
    }
  );
});

app.get("/api/get-user-bayar-lunas", (req, res) => {
  const { id_pel } = req.query;

  const sql = `SELECT * FROM users JOIN transaksi ON users.id_pel = transaksi.id_pel WHERE transaksi.id_pel = ? AND transaksi.stat="lunas"`;

  db.query(sql, [id_pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Message: "Gagal Terkoneksi!", succeed: false });
    }
    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.get("/api/get-user-revisi", (req, res) => {
  const { id_pel } = req.query;

  const sql = `SELECT a.nama, a.id_pel,b.id, b.pem_awal, b.pem_akhir, b.pemakaian, b.biaya, b.bulan, b.tahun, b.stat_rev, b.url, b.revisi FROM users AS a JOIN transaksi AS b ON a.id_pel = b.id_pel WHERE b.id_pel = ? `;

  db.query(sql, [id_pel], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Message: "Gagal Terkoneksi!", succeed: false });
    }
    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.post("/api/update/revisi/user", (req, res) => {
  const { id, bulan, tahun, total, pem_akhir, biaya } = req.body;

  const sql = `UPDATE transaksi SET bulan=?, tahun=?, biaya=?, pem_akhir=?, pemakaian=? WHERE id=?`;

  db.query(sql, [bulan, tahun, biaya, pem_akhir, total, id], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ Message: "Gagal Terkoneksi!", succeed: false });
    }
    res.status(200).json({ succeed: true });
  });
});

// ALL ROLE

app.post("/api/update-status-tagihan", async (req, res) => {
  const { url, id } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ message: "URL tidak terbuat!", succeed: false });
  }

  const sql = `UPDATE transaksi SET stat = "terbayar", url_bukti = ? WHERE id = ?`;
  db.query(sql, [url, id], (err) => {
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
  const { noHP, nama, pass, passConfirm, email, alamat } = req.body;

  if (!noHP || !nama || !pass || !passConfirm || !email || !alamat) {
    return res
      .status(400)
      .json({ message: "Ada data yang kosong!", succeed: false });
  }
  if (!val.isMobilePhone(noHP, "id-ID")) {
    return res
      .status(400)
      .json({ message: "Format Nomor HP salah", succeed: false });
  }
  if (!val.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Email tidak sesuai format", succeed: false });
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
    const sql =
      "INSERT INTO users (noHP, nama, pass, email, alamat) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [noHP, nama, pass, email, alamat], (err) => {
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

    const match = pass === user.pass ? true : false;

    if (!match) {
      return res
        .status(401)
        .json({ message: "Password salah!", succeed: false });
    }

    res.json({ message: `Selamat Datang ${user.nama}`, user, succeed: true });
  });
});

app.get("/api/chart", (req, res) => {
  const sql = `SELECT bulan, tahun, SUM(pemakaian) AS total_pemakaian FROM transaksi GROUP BY bulan, tahun ORDER BY tahun DESC, bulan DESC;`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ succeed: false });
    }

    const data = result;
    res.status(200).json({ succeed: true, data });
  });
});

app.listen(port, console.log(`Berjalan di port: ${port}`));
