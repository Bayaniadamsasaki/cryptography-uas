def gcd(a, b):
    """
    Menghitung Greatest Common Divisor menggunakan algoritma Euclidean
    """
    while b:
        a, b = b, a % b
    return a

def mod_inverse(e, phi):
    """
    Menghitung modular inverse menggunakan Extended Euclidean Algorithm
    """
    def extended_gcd(a, b):
        if a == 0:
            return b, 0, 1
        gcd, x1, y1 = extended_gcd(b % a, a)
        x = y1 - (b // a) * x1
        y = x1
        return gcd, x, y
    
    gcd, x, y = extended_gcd(e, phi)
    if gcd != 1:
        raise Exception('Modular inverse tidak ada')
    return (x % phi + phi) % phi

def rsa_simple():
    """
    Implementasi RSA sederhana dengan bilangan prima kecil
    """
    print("=== RSA SEDERHANA ===")
    
    # Langkah 1: Pilih dua bilangan prima
    p = 7
    q = 11
    print(f"p = {p}")
    print(f"q = {q}")
    
    # Langkah 2: Hitung n = p * q
    n = p * q
    print(f"n = p * q = {n}")
    
    # Langkah 3: Hitung φ(n) = (p-1) * (q-1)
    phi_n = (p - 1) * (q - 1)
    print(f"φ(n) = (p-1) * (q-1) = {phi_n}")
    
    # Langkah 4: Pilih e yang relatif prima dengan φ(n)
    e = 3  # Biasanya dipilih 3, 17, atau 65537
    while gcd(e, phi_n) != 1:
        e += 2
    print(f"e = {e}")
    
    # Langkah 5: Hitung d (private key)
    d = mod_inverse(e, phi_n)
    print(f"d = {d}")
    
    # Kunci publik dan privat
    public_key = (e, n)
    private_key = (d, n)
    print(f"Public Key: {public_key}")
    print(f"Private Key: {private_key}")
    
    # Langkah 6: Enkripsi pesan m = 9
    m = 9
    print(f"\nPesan asli (m): {m}")
    
    # Enkripsi: c = m^e mod n
    c = pow(m, e, n)
    print(f"Ciphertext (c): {c}")
    
    # Dekripsi: m = c^d mod n
    decrypted_m = pow(c, d, n)
    print(f"Decrypted message: {decrypted_m}")
    
    # Verifikasi
    print(f"Verifikasi (m == decrypted): {m == decrypted_m}")
    
    return {
        'p': p, 'q': q, 'n': n, 'phi_n': phi_n,
        'e': e, 'd': d, 'message': m,
        'ciphertext': c, 'decrypted': decrypted_m
    }

# Jalankan implementasi RSA
result = rsa_simple()
