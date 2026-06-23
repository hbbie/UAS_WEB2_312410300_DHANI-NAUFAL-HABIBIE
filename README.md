# UAS_WEB2_312410300_DHANI-NAUFAL-HABIBIE
# 🚀 E-INVENTORY MANAGEMENT SYSTEM

<div align="center">

### 📦 Sistem Informasi Inventaris Barang Berbasis REST API

**Ujian Akhir Semester - Pemrograman Web 2**

---

![PHP](https://img.shields.io/badge/PHP-8.2-blue?style=for-the-badge\&logo=php)
![CodeIgniter](https://img.shields.io/badge/CodeIgniter-4-red?style=for-the-badge\&logo=codeigniter)
![Vue](https://img.shields.io/badge/Vue.js-3-green?style=for-the-badge\&logo=vue.js)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge\&logo=mysql)
![Axios](https://img.shields.io/badge/Axios-HTTP-purple?style=for-the-badge)

</div>

---

# 👨‍🎓 Identitas Mahasiswa

| Keterangan  | Data                   |
| ----------- | ---------------------- |
| Nama        | Rafli Anugrah Ramadhan |
| NIM         | 312410351              |
| Kelas       | I241D                  |
| Mata Kuliah | Pemrograman Web 2      |

---

# 📖 Deskripsi Sistem

E-Inventory merupakan aplikasi manajemen inventaris barang berbasis web yang dibangun menggunakan arsitektur Frontend dan Backend terpisah (Decoupled Architecture).

Sistem ini digunakan untuk mengelola data:

* 📦 Barang
* 🏷️ Kategori
* 🏢 Supplier

dengan dukungan fitur autentikasi login menggunakan token sehingga keamanan data lebih terjamin.

---

# 🏗️ Arsitektur Sistem

```text
Frontend (Vue.js)
        │
        │ Axios Request
        ▼
Backend REST API (CodeIgniter 4)
        │
        │ Query
        ▼
MySQL Database
```

---

# 🛠️ Teknologi Yang Digunakan

## Backend

* PHP 8
* CodeIgniter 4
* REST API
* MySQL

## Frontend

* Vue.js 3
* Vue Router
* Axios
* Tailwind CSS

## Database

* MySQL
* phpMyAdmin

---

# ✨ Fitur Utama

## 🔐 Login System

* Login menggunakan username dan password
* Generate token otomatis
* Penyimpanan token menggunakan Local Storage
* Logout

---

## 📦 Manajemen Barang

* Menampilkan data barang
* Menambah data barang
* Mengubah data barang
* Menghapus data barang

---

## 🏷️ Manajemen Kategori

* Menampilkan data kategori
* Menambah kategori
* Mengubah kategori
* Menghapus kategori

---

## 🏢 Manajemen Supplier

* Menampilkan data supplier
* Menambah supplier
* Mengubah supplier
* Menghapus supplier

---

# 🗄️ Struktur Database

## Tabel User

| Field    | Tipe    |
| -------- | ------- |
| id       | INT     |
| username | VARCHAR |
| password | VARCHAR |
| token    | TEXT    |

---

## Tabel Kategori

| Field         | Tipe    |
| ------------- | ------- |
| id            | INT     |
| nama_kategori | VARCHAR |

---

## Tabel Supplier

| Field         | Tipe    |
| ------------- | ------- |
| id            | INT     |
| nama_supplier | VARCHAR |

---

## Tabel Barang

| Field       | Tipe    |
| ----------- | ------- |
| id          | INT     |
| nama_barang | VARCHAR |
| stok        | INT     |
| harga       | BIGINT  |
| kategori_id | INT     |
| supplier_id | INT     |

---

# 🔗 Relasi Database

```text
Kategori
    │
    └──────► Barang ◄──────┐
                           │
                       Supplier
```

---

# 📡 Endpoint API

## Login

```http
POST /login
```

## Barang

```http
GET    /barang
POST   /barang
PUT    /barang/{id}
DELETE /barang/{id}
```

## Kategori

```http
GET    /kategori
POST   /kategori
PUT    /kategori/{id}
DELETE /kategori/{id}
```

## Supplier

```http
GET    /supplier
POST   /supplier
PUT    /supplier/{id}
DELETE /supplier/{id}
```

---

# 🚀 Cara Menjalankan Project

## Backend

```bash
cd backend-api
php spark serve
```

Akses:

```text
http://localhost:8080
```

---

## Frontend

Simpan folder frontend di dalam:

```text
htdocs/frontend-spa
```

Akses:

```text
http://localhost/frontend-spa/
```

---

# 🔑 Akun Login

### Admin

```text
Username : admin
Password : admin
```

---

# 📸 Dokumentasi Program

## Halaman Login

(Tambahkan Screenshot Login)

## Dashboard

(Tambahkan Screenshot Dashboard)

## Data Barang

(Tambahkan Screenshot Barang)

## Data Kategori

(Tambahkan Screenshot Kategori)

## Data Supplier

(Tambahkan Screenshot Supplier)

---

# 🎯 Hasil Yang Dicapai

✅ REST API Berjalan Dengan Baik

✅ CRUD Barang Berhasil

✅ CRUD Kategori Berhasil

✅ CRUD Supplier Berhasil

✅ Login Menggunakan Token

✅ Vue Router Berjalan

✅ Axios Terhubung Dengan Backend

✅ Database Relasional Berfungsi

---

# 🏆 Kesimpulan

Aplikasi E-Inventory berhasil dikembangkan menggunakan CodeIgniter 4 dan Vue.js dengan menerapkan konsep REST API, autentikasi token, serta pengelolaan data inventaris yang terstruktur. Sistem mampu melakukan operasi CRUD pada data Barang, Kategori, dan Supplier secara efektif sehingga dapat digunakan sebagai solusi manajemen inventaris sederhana berbasis web.

---

<div align="center">

### ⭐ Terima Kasih ⭐

**UAS Pemrograman Web 2**

</div>
