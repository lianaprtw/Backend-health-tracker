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

                //user routes//

// Get all user
app.get('/users', (req, res) => {  // Mendefinisikan endpoint GET pada path '/users'
    db.query('SELECT id_user, nama, email FROM tb_user', (err, result) => {   // Jalankan perintah SQL untuk mengambil data id_user, nama, dan email dari tabel tb_user
        if (err) {  // Jika terjadi error saat menjalankan query
            console.error ("Error fetching users:", err);   // Tampilkan pesan error di console
            return res.status(500).send(err);  // Kirim response dengan status 500 (Internal Server Error) beserta pesan error
        }
        res.json(results);  // Jika query berhasil, kirim hasilnya (array data user) dalam bentuk JSON ke client
    });
});

//Create New User
app.post('/users', (req, ress) => {         // Mengambil data 'nama', 'email', dan 'password' dari body request
    const { nama, email, password } = req.body;     // Menjalankan query SQL untuk memasukkan data user baru ke dalam tabel 'tb_user'
    db.query('INSERT INTO tb_user (nama, email, password) VALUES (?, ?, ?)',  // Query SQL dengan parameter placeholder (?)
        [nama, email, password],    // Data yang akan dimasukkan ke query, sesuai urutan placeholder
        (err, result) => {           // Callback function yang akan dijalankan setelah query selesai
            if (err) {
                console.error("Error creating user:", err);     // Jika terjadi error saat query dijalankan, tampilkan pesan error di console
                return res.status(500).send(err);                // Kirim response ke client dengan status 500 (Internal Server Error) dan kirim error-nya
            }
            res.status(201).json({ id_user: result.insertId, nama, email }); // Jika berhasil, kirim response ke client dengan status 201 (Created)
        }
    );
});

// Get User by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);    // Ambil ID dari URL dan ubah jadi angka
    db.query('SELECT id_user, nama, email FROM tb_user WHERE id_user = ?', [userId], (err, results) => {    // Jalankan query untuk ambil data user dari tabel berdasarkan ID
        if (err) {
            console.error('Error fetching user by ID:', err);
            return res.status(500).send(err);   // Kalau error saat ambil data, kirim status 500
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found'});   // Kalau user tidak ditemukan, kirim status 404
        }
        res.json(results[0]);  // Kirim data user yang ditemukan
    });
});

// Update User
app.put('/users/:id', (req, res) => { // Update data user berdasarkan ID dari URL
    const userId = parseInt(req.params.id);  // Ambil ID dari URL dan ubah ke angka
    const { nama, email, password } = req.body;  
    // Ambil data baru dari body request
    db.query('UPDATE tb_user SET nama = ?, email= ?, password = ? WHERE id_user = ?',
        [nama, email, password, userId],  // Jalankan query untuk update data user berdasarkan ID dengan data baru
        (err, result) => {
            if (err) {
                console.error("Error updating user:", err);
                return res.status(500).send(err);  // Jika error saat update, kirim status 500
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' }); // Jika tidak ada baris yang diubah (ID tidak ditemukan), kirim 404
            }
            res.json({ message: 'User updated successfully', id_user: userId, nama, email }); 
            // Jika berhasil, kirim respon berhasil
        }
    );
});

// Delete User
app.delete('/users/:id', (req, res) => { // Hapus user berdasarkan ID
    const userId = parseInt(req.params.id);  // Ambil ID user dari URL dan ubah jadi angka
    db.query('DELETE FROM tb_user WHERE id_user = ?', [userId], (err, result) => {   // Jalankan query untuk menghapus user berdasarkan ID
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send(err);  // Jika terjadi error saat menghapus, kirim status 500
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });  // Jika tidak ada baris yang dihapus (user tidak ditemukan), kirim status 404
        }
        res.status(204).send(); // Jika berhasil, kirim status 204 (no content)
    });
});