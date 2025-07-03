from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import binascii

def aes_encrypt_decrypt():
    """
    Implementasi AES-128 dalam mode ECB
    """
    # Kunci 16-byte (128 bit)
    key = b'MySecretKey12345'  # 16 bytes
    
    # Plaintext minimal 16 karakter
    plaintext = "Hello Cryptography World!"
    plaintext_bytes = plaintext.encode('utf-8')
    
    print("=== AES-128 ECB ENCRYPTION ===")
    print(f"Plaintext: {plaintext}")
    print(f"Key: {key.decode('utf-8')}")
    print(f"Key length: {len(key)} bytes")
    
    # Enkripsi
    cipher = AES.new(key, AES.MODE_ECB)
    
    # Padding plaintext ke kelipatan 16 bytes
    padded_plaintext = pad(plaintext_bytes, AES.block_size)
    print(f"Padded plaintext length: {len(padded_plaintext)} bytes")
    
    # Proses enkripsi
    ciphertext = cipher.encrypt(padded_plaintext)
    
    # Tampilkan hasil dalam hexadecimal
    ciphertext_hex = binascii.hexlify(ciphertext).decode('utf-8')
    print(f"Ciphertext (hex): {ciphertext_hex}")
    
    # Dekripsi
    decipher = AES.new(key, AES.MODE_ECB)
    decrypted_padded = decipher.decrypt(ciphertext)
    
    # Hapus padding
    decrypted_bytes = unpad(decrypted_padded, AES.block_size)
    decrypted_text = decrypted_bytes.decode('utf-8')
    
    print(f"Decrypted text: {decrypted_text}")
    
    # Verifikasi
    print(f"Verifikasi (plaintext == decrypted): {plaintext == decrypted_text}")
    
    return ciphertext_hex, decrypted_text

# Jalankan fungsi
aes_encrypt_decrypt()
