import express from "express"; // mengimpor express untuk membuat server HTTP
import swaggerUi from "swagger-ui-express"; // mengimpor swagger-ui-express untuk menyajikan dokumentasi API
import fs from "fs"; //mengimpor fs untuk membaca file
import YAML from "yaml"; // mengimpor modul YAML untuk mengonversi file .yaml menjadi objek JavaScript

// Membaca file YAML (dokumentasi Swagger) dan mengubahnya menjadi objek JS
const swaggerDocument = YAML.parse(fs.readFileSync("./user-api.yaml", "utf8"));

const app = express(); // membuat instance dari aplikasi Express

app.use(express.json()); // middleware untuk parsing JSON

// Menyajikan dokumentasi API Swagger di endpoint '/docs'
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// menambakan  kode untuk menjalankan server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

//user routes//

// Get all user
app.get("/users", (req, res) => {
  // Mendefinisikan endpoint GET pada path '/users'
  db.query("SELECT id_user, nama, email FROM tb_user", (err, result) => {
    // Jalankan perintah SQL untuk mengambil data id_user, nama, dan email dari tabel tb_user
    if (err) {
      // Jika terjadi error saat menjalankan query
      console.error("Error fetching users:", err); // Tampilkan pesan error di console
      return res.status(500).send(err); // Kirim response dengan status 500 (Internal Server Error) beserta pesan error
    }
    res.json(results); // Jika query berhasil, kirim hasilnya (array data user) dalam bentuk JSON ke client
  });
});

// GET all trainers
router.get("/", (req, res) => {
  db.query("SELECT * FROM tb_trainner", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
