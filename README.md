# Sistem POS (Point of Sale) Komprehensif

Proyek ini adalah aplikasi Point of Sale (POS) berbasis web modern yang dibangun menggunakan Next.js dan ShadCN. Aplikasi ini dirancang untuk menjadi solusi lengkap bagi usaha kecil dan menengah (UKM), khususnya di bidang F&B, dengan fitur-fitur canggih mulai dari penjualan, manajemen inventaris, hingga modul akuntansi terintegrasi.

## Fitur Utama

Aplikasi ini dibagi menjadi beberapa modul utama yang saling terintegrasi:

### 1. Dasbor
Halaman utama yang memberikan gambaran umum tentang kinerja bisnis secara real-time.
- **Kartu Statistik Utama:** Menampilkan ringkasan Total Pendapatan, Total Penjualan, dan Transaksi Aktif.
- **Grafik Ringkasan Pendapatan:** Visualisasi tren pendapatan bulanan dalam bentuk diagram batang.
- **Aktivitas Penjualan Terkini:** Daftar transaksi penjualan yang baru saja terjadi.

### 2. Modul Penjualan
Pusat untuk semua aktivitas transaksi dengan pelanggan.
- **Pemilihan Mode Penjualan:** Pengguna dapat memilih antara `Penjualan Langsung` atau `Denah Meja`.
- **Penjualan Langsung (Takeaway):** Antarmuka kasir untuk transaksi cepat. Ideal untuk pesanan yang langsung dibayar.
- **Denah Meja (Dine-in):**
  - Tampilan visual meja-meja di restoran.
  - Status meja dinamis (`Kosong`, `Terisi`) berdasarkan pesanan aktif.
  - Kemampuan untuk membuka pesanan yang belum selesai (*open bill*) untuk setiap meja.
- **Fitur Kasir Lengkap:**
  - **Keranjang Belanja Dinamis:** Tambah, hapus, dan ubah jumlah item dengan mudah.
  - **Katalog Produk:** Produk dikelompokkan berdasarkan kategori dalam bentuk tab.
  - **Sistem Diskon:** Terapkan diskon dalam bentuk persentase pada total tagihan.
  - **Pembayaran Fleksibel (Split Payment):** Pelanggan bisa membayar menggunakan beberapa metode (Tunai, Kartu, QR, Transfer Bank) dalam satu transaksi.
  - **Cetak Struk:** Menghasilkan struk pembayaran yang siap untuk dicetak pada printer termal.

### 3. Modul Inventaris
Fitur lengkap untuk mengelola produk dan stok barang.
- **Manajemen Produk:**
  - Lihat, tambah, ubah, dan hapus produk.
  - Informasi detail seperti SKU, harga, kategori, dan stok.
  - Indikator status stok visual (`Stok Cukup`, `Stok Menipis`, `Stok Habis`).
- **Manajemen Kategori:** Kelola kategori dan sub-kategori produk untuk organisasi yang lebih baik.
- **Stok Opname:**
  - Bandingkan jumlah stok di sistem dengan stok fisik hasil perhitungan manual.
  - Hitung selisih secara otomatis untuk mempermudah penyesuaian.

### 4. Modul Pembelian
Mengelola hubungan dan transaksi dengan supplier.
- **Pesanan Pembelian (Purchase Order):**
  - Buat dan lacak pesanan pembelian ke supplier.
  - Fitur (simulasi) untuk mencatat penerimaan barang yang akan memperbarui stok inventaris.
- **Manajemen Supplier:** Database untuk menyimpan informasi kontak dan detail supplier.

### 5. Modul Akuntansi
Pondasi untuk pencatatan keuangan yang akurat dan terstruktur.
- **Dasbor Akuntansi:** Pusat navigasi untuk semua fitur akuntansi.
- **Bagan Akun (Chart of Accounts):** Daftar terstruktur semua akun keuangan (Aset, Liabilitas, Ekuitas, Pendapatan, Biaya).
- **Entri Jurnal:** Lihat riwayat semua transaksi jurnal dan buat entri manual untuk penyesuaian.
- **Buku Besar (General Ledger):** Lacak riwayat transaksi terperinci untuk setiap akun.

### 6. Laporan & Analitik
Dapatkan wawasan bisnis melalui berbagai laporan.
- **Laporan Metode Pembayaran:** Analisis pendapatan berdasarkan metode pembayaran (Tunai, Kartu, dll.).
- **Analitik Produk Terlaris:** Lihat 5 produk yang paling banyak terjual.
- **Laporan Keuangan (Dasar):** Akses cepat ke laporan (placeholder) Laba & Rugi dan Pajak.
- **Jejak Audit (Audit Trail):** Log terperinci dari semua aktivitas penting yang terjadi di dalam sistem untuk keamanan dan akuntabilitas.

### 7. Pengaturan & Manajemen Pengguna
- **Pengaturan Toko:** Konfigurasi informasi dasar toko seperti nama dan alamat.
- **Pengaturan Denah Meja:** Atur jumlah meja yang akan ditampilkan pada halaman penjualan.
- **Manajemen Pengguna & Peran:**
  - Tambah, ubah, dan hapus akun pengguna (staf).
  - Buat peran kustom (misal: Admin, Kasir) dengan izin akses yang dapat diatur secara detail per modul.

## Teknologi yang Digunakan
- **Framework:** Next.js (React)
- **UI Components:** ShadCN/UI
- **Styling:** Tailwind CSS
- **Bahasa:** TypeScript

## Rencana Pengembangan Selanjutnya
- **Integrasi Database:** Menghubungkan aplikasi ke database (seperti Firebase Firestore) untuk menjadikan data persisten dan real-time.
- **Otomatisasi Jurnal Akuntansi:** Membuat transaksi penjualan secara otomatis menghasilkan entri jurnal yang sesuai.
- **Manajemen Shift:** Fitur untuk memulai dan mengakhiri shift kasir, termasuk pencatatan kas awal dan akhir.
