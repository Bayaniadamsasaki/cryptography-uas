"""
Script untuk menjalankan semua algoritma kriptografi sekaligus
"""

print("=" * 60)
print("UJIAN AKHIR SEMESTER - KRIPTOGRAFI")
print("Program Studi: Teknologi Informasi")
print("Semester: VIII")
print("=" * 60)
print()

# Import dan jalankan semua algoritma
try:
    print("Menjalankan semua algoritma kriptografi...")
    print()
    
    # 1. Caesar Cipher
    exec(open('scripts/1_caesar_cipher.py').read())
    print("\n" + "="*50 + "\n")
    
    # 2. Vigenère Cipher  
    exec(open('scripts/2_vigenere_cipher.py').read())
    print("\n" + "="*50 + "\n")
    
    # 3. AES Encryption
    exec(open('scripts/3_aes_encryption.py').read())
    print("\n" + "="*50 + "\n")
    
    # 4. RSA Simple
    exec(open('scripts/4_rsa_simple.py').read())
    print("\n" + "="*50 + "\n")
    
    # 5. SHA-256 Hash
    exec(open('scripts/5_sha256_hash.py').read())
    
    print("\n" + "="*60)
    print("SEMUA ALGORITMA BERHASIL DIJALANKAN!")
    print("="*60)
    
except Exception as e:
    print(f"Error: {e}")
    print("Pastikan semua file script tersedia dan library yang diperlukan sudah terinstall.")
