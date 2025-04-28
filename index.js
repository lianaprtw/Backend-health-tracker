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
app.get("/traineers", (req, res) => {
  db.query(
    "SELECT id_traineer, nama, spesialis, email FROM tb_traineer",
    (err, results) => {
      if (err) {
        console.error("Error fetching traineers:", err);
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});

app.post("/traineers", (req, res) => {
  const { nama, spesialis, email, password } = req.body;
  db.query(
    "INSERT INTO tb_traineer (nama, spesialis, email, password) VALUES (?, ?, ?, ?)",
    [nama, spesialis, email, password],
    (err, result) => {
      if (err) {
        console.error("Error creating traineer:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_traineer: result.insertId, nama, spesialis, email });
    }
  );
});

app.get("/traineers/:id", (req, res) => {
  const traineerID = parseInt(req.params.id);
  db.query(
    "SELECT id_traineer, nama, spesialis, email FROM tb_traineer WHERE id_traineer = ?",
    [traineerID],
    (err, result) => {
      if (err) {
        console.error("Error fetching traineer by ID:", err);
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Traineer not found" });
      }
      res.json(result[0]);
    }
  );
});

app.put("/traineers/:id", (req, res) => {
  const traineerId = parseInt(req.params.id);
  const { nama, spesialis, email, password } = req.body;
  db.query(
    "UPDATE tb_traineer SET nama = ?, spesialis = ?, email = ?, password = ? WHERE id_traineer = ?",
    [nama, spesialis, email, password, traineerId],
    (err, result) => {
      if (err) {
        console.error("Error updating traineer:", err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Traineer not found" });
      }
      res.json({ message: "Traineer updated successfully", id_traineer: traineerId, nama, spesialis, email });
    }
  );
});

app.delete("/traineers/:id", (req, res) => {
  const traineerId = parseInt(req.params.id);
  db.query("DELETE FROM tb_traineer WHERE id_traineer = ?", [traineerId], (err, result) => {
    if (err) {
      console.error("Error deleting traineer:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Traineer not found" });
    }
    res.status(204).send();
  });
});

// ========== JADWAL ROUTES ==========
app.get('/jadwals', (req, res) => {
  db.query('SELECT id_jadwal, id_user, id_traineer, tanggal, waktu, jenis_latihan FROM tb_jadwal', (err, results) => {
    if (err) {
      console.error("Error fetching jadwals:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/jadwals', (req, res) => {
  const { id_user, id_traineer, tanggal, waktu, jenis_latihan } = req.body;
  db.query(`INSERT INTO tb_jadwal (id_user, id_traineer, tanggal, waktu, jenis_latihan) VALUES (?, ?, ?, ?, ?)`,
    [id_user, id_traineer, tanggal, waktu, jenis_latihan],
    (err, result) => {
      if (err) {
        console.error("Error creating jadwal:", err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id_jadwal: result.insertId, id_user, id_traineer, tanggal, waktu, jenis_latihan });
    }
  );
});

app.get('/jadwals/:id', (req, res) => {
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

app.put('/jadwals/:id', (req, res) => {
  const jadwalId = parseInt(req.params.id);
  const { id_user, id_traineer, tanggal, waktu, jenis_latihan } = req.body;
  db.query('UPDATE tb_jadwal SET id_user = ?, id_traineer = ?, tanggal = ?, waktu = ?, jenis_latihan = ? WHERE id_jadwal = ?',
    [id_user, id_traineer, tanggal, waktu, jenis_latihan, jadwalId],
    (err, result) => {
      if (err) {
        console.error("Error updating jadwal:", err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Jadwal not found' });
      }
      res.json({ message: 'Jadwal updated successfully', id_jadwal: jadwalId, id_user, id_traineer, tanggal, waktu, jenis_latihan });
    }
  );
});

app.delete('/jadwals/:id', (req, res) => {
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