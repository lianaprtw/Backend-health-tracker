import mysql from 'mysql2'; // Import mysql2 untuk koneksi ke database MySQL

// membuat koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'health_trecker',
  password: ''
});

//mengetes koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
    } else {
        console.log('Terhubung ke databse');
    }
});


// Ekspor koneksi supaya bisa digunakan di file lain
export default db;
