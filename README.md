## 📝 Submission Notes
## Name: Nabil Achmad Khoir
### 👩💻 Role: Mid-Level Fullstack Developer

### ✅ Task yang Diselesaikan
Berdasarkan `TASKS_FULLSTACK_MID.md`:
- [x] **Search & filter** — Implementasi pencarian dan filter genre secara server-side pada `/api/books?q=&genre=`.
- [x] **Detail page** — Halaman detail buku (`/books/:id`) yang fungsional dengan kontrol perubahan status bacaan (Want to read → Reading → Read).
- [x] **User library** — Arsitektur Library diubah menjadi "Isolated Per-User Library" menggunakan `user_libraries.json`. Setiap pengguna memiliki *library* dari 0.
- [x] **Hapus dari My Library** — Fitur menghapus buku dari koleksi pribadi (mengembalikan ke status `unread`) tanpa menghancurkan data di master katalog.
- [x] **Reading progress** — Kemampuan memperbarui halaman bacaan saat ini (`currentPage`) lengkap dengan visualisasi *Progress Bar*.
- [x] **Input validation** — Backend divalidasi ketat dan merespons `400 Bad Request` jika input negatif atau salah format.
- [x] **[Opsional] Pagination** — Katalog buku mengadopsi API `limit` dan `page` untuk penanganan data skala besar yang ringan.
- [x] **[Opsional] Authentication** — Mengamankan API mutasi data. Dilengkapi sistem *Token* kustom, serta halaman Login & Register.
- [x] **[Opsional] Reading stats** — Tab Profil 100% *Live*, dihitung oleh backend (`GET /api/stats`) berdasarkan buku yang statusnya `read` di *library* milik user.
- [x] **[Bonus] Unit Testing** — Penulisan tes otomatis (`test_app.py`) berbasis `unittest` untuk rute API Backend.

---

### 🔄 Ringkasan Perubahan & Arsitektur

| Konsep | Penjelasan |
|---|---|
| **Global Catalog vs User Library** | Master katalog disimpan di `books.json`. Progres bacaan dan status personal setiap pengguna dipisah dan disimpan di `user_libraries.json`. Hal ini membuat *library* satu *user* tidak merusak *library* pengguna lain. |
| **Authentication Flow** | Endpoint yang mengubah data (POST, PUT, DELETE) dikunci dengan dekorator `@requires_auth`. Frontend menyisipkan Token di *header* via Axios Interceptor. Jika ditolak (401), *user* di-redirect ke halaman Login. |
| **Statistik Real-Time** | Backend menyisir `user_libraries` milik akun yang login, lalu menghitung metrik secara dinamis (Total buku dibaca, total halaman, genre favorit). |

---

### 📦 File yang Diubah & Ditambahkan

| File | Status | Perubahan |
|---|---|---|
| `backend/app.py` | ✏️ Diubah | Server-side filter, Paginasi, Auth Middleware, Logika Pemisahan User Library, & Endpoint Statistik. |
| `backend/users.json` | 🆕 File baru | Database khusus kredensial login pengguna. |
| `backend/test_app.py` | 🆕 File baru | Skrip Unit Test Python untuk menjamin *quality control* pada endpoint backend. |
| `frontend/src/services/api.ts` | ✏️ Diubah | Menambahkan Axios *request interceptor* (Token) & *response interceptor* (Global 401 Redirect). |
| `frontend/src/pages/Index.tsx` | ✏️ Diubah | Menambahkan tombol Sign In/Log Out, integrasi Live Profil Stats, fungsionalitas Remove dari Library. |
| `frontend/src/pages/Login.tsx` & `Register.tsx` | 🆕 File baru | UI autentikasi penuh untuk pengguna. |
| `frontend/src/components/BookCard.tsx` | ✏️ Diubah | Menambahkan Ikon *Trash* (Remove) yang beroperasi via handler tanpa mengganggu navigasi Link. |
| `frontend/src/App.tsx` | ✏️ Diubah | Mendaftarkan *routes* untuk `/login` dan `/register`. |

---

### 🚀 Cara Menjalankan

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows Git Bash: source venv/Scripts/activate
# Install dependensi (jika belum)
# pip install flask flask-cors python-dotenv
python app.py
# → API berjalan di http://localhost:5001
```

**Testing Backend:**
```bash
cd backend
python test_app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# → Web berjalan di http://localhost:5173
```

