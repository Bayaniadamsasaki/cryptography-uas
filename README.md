# Aplikasi Kriptografi

Aplikasi web interaktif untuk mempelajari dan mencoba berbagai algoritma kriptografi klasik dan modern, seperti Caesar Cipher, Vigenère Cipher, AES, RSA, dan SHA-256. Proyek ini juga dilengkapi dengan script Python untuk demonstrasi algoritma secara langsung.

## Fitur
- Antarmuka web modern berbasis Next.js + Tailwind CSS
- Implementasi dan simulasi:
  - Caesar Cipher
  - Vigenère Cipher
  - AES Encryption (AES-128)
  - RSA Cipher
  - SHA-256 Hash
- Script Python untuk menjalankan dan menguji algoritma secara mandiri

## Cara Menjalankan Aplikasi Web

1. **Clone repository ini:**
   ```bash
   git clone <url-repo-anda>
   cd cryptography-exam
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # atau
   pnpm install
   ```
3. **Jalankan aplikasi dalam mode development:**
   ```bash
   npm run dev
   # atau
   pnpm dev
   ```
4. **Buka di browser:**
   Buka [http://localhost:3000](http://localhost:3000)

## Menjalankan Script Algoritma Kriptografi (Python)

1. Pastikan Python 3 sudah terinstall di komputer Anda.
2. Masuk ke folder `scripts/`:
   ```bash
   cd scripts
   ```
3. Jalankan salah satu script, misal untuk Caesar Cipher:
   ```bash
   python 1_caesar_cipher.py
   ```
   Atau jalankan semua algoritma sekaligus:
   ```bash
   python run_all_algorithms.py
   ```

## Struktur Folder Penting
- `app/` : Source code aplikasi web (Next.js)
- `components/` : Komponen UI
- `scripts/` : Script Python algoritma kriptografi
- `public/` : Asset gambar

## Lisensi
Proyek ini dibuat untuk tujuan pembelajaran. 