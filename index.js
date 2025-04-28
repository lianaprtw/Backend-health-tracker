// index.js (Fixed Version)
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import db from "./db.js";

const swaggerDocument = YAML.parse(fs.readFileSync("./user-api.yml", "utf8"));

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
  });
  
// ========== USER ROUTES ==========
app.get("/users", (req, res) => {
  db.query("SELECT id_user, nama, email FROM tb_user", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { nama, email, password } = req.body;
  db.query(
    "INSERT INTO tb_user (nama, email, password) VALUES (?, ?, ?)",
    [nama, email, password],
    (err, result) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_user: result.insertId, nama, email });
    }
  );
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  db.query(
    "SELECT id_user, nama, email FROM tb_user WHERE id_user = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching user by ID:", err);
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(results[0]);
    }
  );
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { nama, email, password } = req.body;
  db.query(
    "UPDATE tb_user SET nama = ?, email= ?, password = ? WHERE id_user = ?",
    [nama, email, password, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated successfully", id_user: userId, nama, email });
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  db.query("DELETE FROM tb_user WHERE id_user = ?", [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  });
});

// ========== TRAINEER ROUTES ==========
app.get("/trainner", (req, res) => {
  db.query(
    "SELECT id_trainner, nama, spesialis, email FROM tb_trainner",
    (err, results) => {
      if (err) {
        console.error("Error fetching trainner:", err);
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});

app.post("/trainner", (req, res) => {
  const { nama, spesialis, email, password } = req.body;
  db.query(
    "INSERT INTO tb_trainner (nama, spesialis, email, password) VALUES (?, ?, ?, ?)",
    [nama, spesialis, email, password],
    (err, result) => {
      if (err) {
        console.error("Error creating trainner:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_trainner: result.insertId, nama, spesialis, email });
    }
  );
});

app.get("/trainner/:id", (req, res) => {
  const trainnerID = parseInt(req.params.id);
  db.query(
    "SELECT id_trainner, nama, spesialis, email FROM tb_trainner WHERE id_trainner = ?",
    [trainnerID],
    (err, result) => {
      if (err) {
        console.error("Error fetching trainner by ID:", err);
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Traineer not found" });
      }
      res.json(result[0]);
    }
  );
});

app.put("/trainner/:id", (req, res) => {
  const trainnerId = parseInt(req.params.id);
  const { nama, spesialis, email, password } = req.body;
  db.query(
    "UPDATE tb_trainner SET nama = ?, spesialis = ?, email = ?, password = ? WHERE id_trainner = ?",
    [nama, spesialis, email, password, trainnerId],
    (err, result) => {
      if (err) {
        console.error("Error updating trainner:", err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Traineer not found" });
      }
      res.json({ message: "Traineer updated successfully", id_trainner: trainnerId, nama, spesialis, email });
    }
  );
});

app.delete("/trainner/:id", (req, res) => {
  const trainnerId = parseInt(req.params.id);
  db.query("DELETE FROM tb_trainner WHERE id_trainner = ?", [trainnerId], (err, result) => {
    if (err) {
      console.error("Error deleting trainner:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Traineer not found" });
    }
    res.status(204).send();
  });
});

// ========== JADWAL ROUTES ==========
app.get('/jadwal', (req, res) => {
  db.query(
    'SELECT id_jadwal, id_user, id_trainner, tanggal, waktu, jenis_latihan FROM tb_jadwal', (err, results) => {
    if (err) {
      console.error("Error fetching jadwal:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/jadwal', (req, res) => {
  const { id_user, id_trainner, tanggal, waktu, jenis_latihan } = req.body;
  db.query(`INSERT INTO tb_jadwal (id_user, id_trainner, tanggal, waktu, jenis_latihan) VALUES (?, ?, ?, ?, ?)`,
    [id_user, id_trainner, tanggal, waktu, jenis_latihan],
    (err, result) => {
      if (err) {
        console.error("Error creating jadwal:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_jadwal: result.insertId, id_user, id_trainner, tanggal, waktu, jenis_latihan });
    }
  );
});

app.get('/jadwal/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tb_jadwal WHERE id_jadwal = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching jadwal:', err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }
    res.json(results[0]);
  });
});

app.put('/jadwal/:id', (req, res) => {
  const jadwalId = parseInt(req.params.id);
  const { id_user, id_trainner, tanggal, waktu, jenis_latihan } = req.body;
  db.query('UPDATE tb_jadwal SET id_user = ?, id_trainner = ?, tanggal = ?, waktu = ?, jenis_latihan = ? WHERE id_jadwal = ?',
    [id_user, id_trainner, tanggal, waktu, jenis_latihan, jadwalId],
    (err, result) => {
      if (err) {
        console.error("Error updating jadwal:", err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Jadwal not found' });
      }
      res.json({ message: 'Jadwal updated successfully', id_jadwal: jadwalId, id_user, id_trainner, tanggal, waktu, jenis_latihan });
    }
  );
});

app.delete('/jadwal/:id', (req, res) => {
  const jadwalId = parseInt(req.params.id);
  db.query('DELETE FROM tb_jadwal WHERE id_jadwal = ?', [jadwalId], (err, result) => {
    if (err) {
      console.error("Error deleting jadwal:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }
    res.status(204).send();
  });
});

// ========== JADWAL airminum ==========

app.get('/air_minum', (req, res) => {
  db.query('SELECT * FROM tb_air_minum', (err, results) => {
    if (err) {
      console.error("Error fetching air minum:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/air_minum', (req, res) => {
  const { id_user, tanggal, waktu, jumlah_air } = req.body;
  db.query("INSERT INTO tb_air_minum (id_user, tanggal, waktu, jumlah_air) VALUES (?, ?, ?, ?)",
    [id_user, tanggal, waktu, jumlah_air],
    (err, result) => {
      if (err) {
        console.error("Error inserting air minum:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_air_minum: result.insertId, id_user, tanggal, waktu, jumlah_air });
    });
});

app.get('/air_minum/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM tb_air_minum WHERE id_air_minum = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: "Data not found" });
    res.json(results[0]);
  });
});

app.put('/air_minum/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { id_user, tanggal, waktu, jumlah_air } = req.body;
  db.query("UPDATE tb_air_minum SET id_user = ?, tanggal = ?, waktu = ?, jumlah_air = ? WHERE id_air_minum = ?",
    [id_user, tanggal, waktu, jumlah_air, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Data not found" });
      res.json({ message: "Air minum updated", id_air_minum: id });
    });
});

app.delete('/air_minum/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM tb_air_minum WHERE id_air_minum = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Data not found" });
    res.status(204).send();
  });
});

// ========== PROGGRESS ROUTES ==========
app.get('/proggress', (req, res) => {
  db.query('SELECT * FROM tb_proggress', (err, results) => {
    if (err) {
      console.error("Error fetching proggress:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/proggress', (req, res) => {
  const { id_user, tanggal, jumlah_langkah, kalori_harian, kalori_mingguan, kalori_bulanan } = req.body;
  db.query("INSERT INTO tb_proggress (id_user, tanggal, jumlah_langkah, kalori_harian, kalori_mingguan, kalori_bulanan) VALUES (?, ?, ?, ?, ?, ?)",
    [id_user, tanggal, jumlah_langkah, kalori_harian, kalori_mingguan, kalori_bulanan],
    (err, result) => {
      if (err) {
        console.error("Error inserting proggress:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_progress: result.insertId });
    });
});

app.get('/progress/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM tb_proggress WHERE id_proggress = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: "Data not found" });
    res.json(results[0]);
  });
});

app.put('/progress/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { id_user, tanggal, jumlah_langkah, kalori_harian, kalori_mingguan, kalori_bulanan } = req.body;
  db.query("UPDATE tb_proggress SET id_user = ?, tanggal = ?, jumlah_langkah = ?, kalori_harian = ?, kalori_mingguan = ?, kalori_bulanan = ? WHERE id_proggress = ?",
    [id_user, tanggal, jumlah_langkah, kalori_harian, kalori_mingguan, kalori_bulanan, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Data not found" });
      res.json({ message: "Progress updated", id_progress: id });
    });
});

app.delete('/progress/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM tb_proggress WHERE id_progress = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Data not found" });
    res.status(204).send();
  });
});
