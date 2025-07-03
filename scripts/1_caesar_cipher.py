def caesar_encrypt(plaintext, shift):
    """
    Enkripsi menggunakan Caesar Cipher
    """
    result = ""
    for char in plaintext.upper():
        if char.isalpha():
            # Konversi ke angka (A=0, B=1, ..., Z=25)
            char_num = ord(char) - ord('A')
            # Geser dengan kunci dan modulo 26
            encrypted_num = (char_num + shift) % 26
            # Konversi kembali ke huruf
            encrypted_char = chr(encrypted_num + ord('A'))
            result += encrypted_char
        else:
            result += char
    return result

def caesar_decrypt(ciphertext, shift):
    """
    Dekripsi menggunakan Caesar Cipher
    """
    result = ""
    for char in ciphertext.upper():
        if char.isalpha():
            # Konversi ke angka (A=0, B=1, ..., Z=25)
            char_num = ord(char) - ord('A')
            # Geser mundur dengan kunci dan modulo 26
            decrypted_num = (char_num - shift) % 26
            # Konversi kembali ke huruf
            decrypted_char = chr(decrypted_num + ord('A'))
            result += decrypted_char
        else:
            result += char
    return result

# Contoh penggunaan sesuai soal
plaintext = "KRIPTOGRAFI"
kunci = 4

print("=== CAESAR CIPHER ===")
print(f"Plaintext: {plaintext}")
print(f"Kunci (shift): {kunci}")

# Enkripsi
ciphertext = caesar_encrypt(plaintext, kunci)
print(f"Ciphertext: {ciphertext}")

# Dekripsi
decrypted_text = caesar_decrypt(ciphertext, kunci)
print(f"Decrypted text: {decrypted_text}")

# Verifikasi
print(f"Verifikasi (plaintext == decrypted): {plaintext == decrypted_text}")
