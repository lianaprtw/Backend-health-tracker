import express from 'express'; // mengimpor express untuk membuat server HTTP
import swaggerUi from 'swagger-ui-express'; // mengimpor swagger-ui-express untuk menyajikan dokumentasi API
import fs from 'fs'; //mengimpor fs untuk membaca file
import YAML from 'yaml'; // mengimpor modul YAML untuk mengonversi file .yaml menjadi objek JavaScript

// Membaca file YAML (dokumentasi Swagger) dan mengubahnya menjadi objek JS
const swaggerDocument = YAML.parse(fs.readFileSync('./user-api.yaml', 'utf8'));

const app = express(); // membuat instance dari aplikasi Express

app.use(express.json()); // middleware untuk parsing JSON

// Menyajikan dokumentasi API Swagger di endpoint '/docs'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// menambakan  kode untuk menjalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
