def generate_key(plaintext, keyword):
    """
    Generate kunci sepanjang plaintext dengan mengulang keyword
    """
    key = ""
    keyword_index = 0
    
    for char in plaintext:
        if char.isalpha():
            key += keyword[keyword_index % len(keyword)]
            keyword_index += 1
        else:
            key += char
    
    return key.upper()

def vigenere_encrypt(plaintext, keyword):
    """
    Enkripsi menggunakan Vigenère Cipher
    """
    plaintext = plaintext.upper()
    keyword = keyword.upper()
    key = generate_key(plaintext, keyword)
    result = ""
    
    for i, char in enumerate(plaintext):
        if char.isalpha():
            # Konversi ke angka
            plain_num = ord(char) - ord('A')
            key_num = ord(key[i]) - ord('A')
            # Enkripsi dengan rumus Vigenère
            cipher_num = (plain_num + key_num) % 26
            # Konversi kembali ke huruf
            cipher_char = chr(cipher_num + ord('A'))
            result += cipher_char
        else:
            result += char
    
    return result, key

def vigenere_decrypt(ciphertext, keyword):
    """
    Dekripsi menggunakan Vigenère Cipher
    """
    ciphertext = ciphertext.upper()
    keyword = keyword.upper()
    key = generate_key(ciphertext, keyword)
    result = ""
    
    for i, char in enumerate(ciphertext):
        if char.isalpha():
            # Konversi ke angka
            cipher_num = ord(char) - ord('A')
            key_num = ord(key[i]) - ord('A')
            # Dekripsi dengan rumus Vigenère
            plain_num = (cipher_num - key_num) % 26
            # Konversi kembali ke huruf
            plain_char = chr(plain_num + ord('A'))
            result += plain_char
        else:
            result += char
    
    return result

# Contoh penggunaan
plaintext = "KRIPTOGRAFI"
keyword = "KEY"

print("=== VIGENÈRE CIPHER ===")
print(f"Plaintext: {plaintext}")
print(f"Keyword: {keyword}")

# Enkripsi
ciphertext, extended_key = vigenere_encrypt(plaintext, keyword)
print(f"Extended Key: {extended_key}")
print(f"Ciphertext: {ciphertext}")

# Dekripsi
decrypted_text = vigenere_decrypt(ciphertext, keyword)
print(f"Decrypted text: {decrypted_text}")

# Verifikasi
print(f"Verifikasi (plaintext == decrypted): {plaintext == decrypted_text}")
