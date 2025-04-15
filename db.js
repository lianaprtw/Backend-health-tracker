import mysql from 'mysql2'; // Import mysql2 untuk koneksi ke database MySQL

// membuat koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'health_trecker',
  password: ''
});

// Ekspor koneksi supaya bisa digunakan di file lain
export default db;
