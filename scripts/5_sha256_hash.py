import hashlib

def sha256_hash(password):
    """
    Melakukan hashing password menggunakan SHA-256
    """
    # Encode password ke bytes
    password_bytes = password.encode('utf-8')
    
    # Buat hash SHA-256
    hash_object = hashlib.sha256(password_bytes)
    
    # Dapatkan nilai hash dalam format hexadecimal
    hex_hash = hash_object.hexdigest()
    
    return hex_hash

def demonstrate_hash_sensitivity():
    """
    Mendemonstrasikan bagaimana hash berubah dengan perubahan 1 karakter
    """
    print("=== SHA-256 PASSWORD HASHING ===")
    
    # Password asli
    original_password = "MySecurePassword123"
    original_hash = sha256_hash(original_password)
    
    print(f"Password asli: {original_password}")
    print(f"Hash SHA-256: {original_hash}")
    print()
    
    # Ubah 1 karakter (huruf terakhir dari '3' ke '4')
    modified_password = "MySecurePassword124"
    modified_hash = sha256_hash(modified_password)
    
    print(f"Password diubah: {modified_password}")
    print(f"Hash SHA-256: {modified_hash}")
    print()
    
    # Bandingkan hash
    print("=== PERBANDINGAN HASH ===")
    print(f"Hash asli:    {original_hash}")
    print(f"Hash diubah:  {modified_hash}")
    print(f"Hash sama? {original_hash == modified_hash}")
    
    # Hitung berapa banyak karakter yang berbeda
    different_chars = sum(1 for a, b in zip(original_hash, modified_hash) if a != b)
    print(f"Jumlah karakter berbeda: {different_chars} dari {len(original_hash)} karakter")
    
    # Demonstrasi dengan input user
    print("\n=== INPUT DARI USER ===")
    user_password = input("Masukkan password Anda: ")
    user_hash = sha256_hash(user_password)
    print(f"Hash dari password Anda: {user_hash}")
    
    return {
        'original_password': original_password,
        'original_hash': original_hash,
        'modified_password': modified_password,
        'modified_hash': modified_hash,
        'user_password': user_password,
        'user_hash': user_hash
    }

# Jalankan demonstrasi
hash_demo = demonstrate_hash_sensitivity()
