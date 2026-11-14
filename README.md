# Manajemen Produk — Tugas 3 Pemrograman Web

Aplikasi web berbasis React dan Vite untuk mengelola daftar produk dan harga, dibuat sebagai penyelesaian Tugas 3 mata kuliah Pemrograman Web dengan fokus pada penerapan *event handler*, pengelolaan *state*, dan penerusan fungsi *callback* melalui *props*.

| Nama | NRP |
|---|---|
| Chilmi Muhammad Ulin Nuha | 5027251003 |

## Fitur Utama
- **Daftar & Pencarian Produk:** Menampilkan kartu produk (ID, nama, dan harga dalam format Rupiah) serta filter pencarian secara *real-time*.
- **Tambah Produk:** Menambahkan produk baru melalui modal form dengan validasi nama wajib diisi dan harga lebih dari `0`.
- **Edit Produk:** Memperbarui nama dan harga produk yang dipilih melalui modal form.
- **Hapus Produk:** Menghapus produk dari daftar setelah konfirmasi melalui modal pop-up.

## Teknologi yang Digunakan
- React
- Vite
- CSS3

## Struktur Folder Utama
```text
src/
├── components/
│   ├── DeleteConfirmModal.jsx   # Modal konfirmasi hapus produk
│   ├── ProductCard.jsx          # Kartu item produk dengan prop handler onEdit & onDelete
│   └── ProductFormModal.jsx     # Modal form untuk tambah dan edit produk
├── data/
│   └── initialProducts.js       # Data awal produk dan fungsi formatRupiah
├── App.css                      # Styling antarmuka dan modal
└── App.jsx                      # Komponen utama pengelola state dan event handler
```
