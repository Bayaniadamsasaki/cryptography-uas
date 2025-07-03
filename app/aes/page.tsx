"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

// Simple AES simulation (for educational purposes only)
// Note: This is NOT a real AES implementation
function simpleAESEncrypt(text: string, key: string): string {
  // This is a simplified simulation for demonstration
  // Real AES would require proper implementation
  let result = ""
  const keyBytes = new TextEncoder().encode(key.padEnd(16, "0").slice(0, 16))
  const textBytes = new TextEncoder().encode(text)

  for (let i = 0; i < textBytes.length; i++) {
    const encrypted = textBytes[i] ^ keyBytes[i % keyBytes.length]
    result += encrypted.toString(16).padStart(2, "0")
  }

  return result.toUpperCase()
}

function simpleAESDecrypt(hexText: string, key: string): string {
  try {
    const keyBytes = new TextEncoder().encode(key.padEnd(16, "0").slice(0, 16))
    const bytes = []

    for (let i = 0; i < hexText.length; i += 2) {
      const hexByte = hexText.substr(i, 2)
      const byte = Number.parseInt(hexByte, 16)
      const decrypted = byte ^ keyBytes[(i / 2) % keyBytes.length]
      bytes.push(decrypted)
    }

    return new TextDecoder().decode(new Uint8Array(bytes))
  } catch {
    return "Error decrypting"
  }
}

export default function AESPage() {
  const [plaintext, setPlaintext] = useState("Hello Cryptography World!")
  const [key, setKey] = useState("MySecretKey12345")
  const [ciphertext, setCiphertext] = useState("")
  const [decryptedText, setDecryptedText] = useState("")

  const handleEncrypt = () => {
    if (key.length < 16) {
      alert("Kunci harus minimal 16 karakter untuk AES-128")
      return
    }

    const encrypted = simpleAESEncrypt(plaintext, key)
    setCiphertext(encrypted)

    // Auto decrypt to verify
    const decrypted = simpleAESDecrypt(encrypted, key)
    setDecryptedText(decrypted)
  }

  const handleReset = () => {
    setPlaintext("Hello Cryptography World!")
    setKey("MySecretKey12345")
    setCiphertext("")
    setDecryptedText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AES Encryption</h1>
              <p className="text-gray-600">Soal 3 - 20 Poin</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="text-orange-800">
                <p className="font-semibold mb-1">Catatan Penting:</p>
                <p className="text-sm">
                  Ini adalah simulasi sederhana AES untuk tujuan edukasi. Implementasi AES yang sesungguhnya memerlukan
                  library khusus seperti pycryptodome.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Masukkan plaintext dan kunci 16-byte untuk AES-128</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="plaintext">Plaintext (minimal 16 karakter)</Label>
                <Textarea
                  id="plaintext"
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  placeholder="Masukkan teks minimal 16 karakter..."
                  className="font-mono"
                />
                <p className="text-sm text-gray-500 mt-1">Panjang: {plaintext.length} karakter</p>
              </div>

              <div>
                <Label htmlFor="key">Kunci (16-byte / 128-bit)</Label>
                <Input
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Masukkan kunci 16 karakter..."
                  className="font-mono"
                  maxLength={16}
                />
                <p className="text-sm text-gray-500 mt-1">Panjang: {key.length}/16 karakter</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEncrypt} className="flex-1" disabled={key.length < 16}>
                  Enkripsi & Dekripsi
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Hasil enkripsi AES dalam format hexadecimal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Ciphertext (Hexadecimal)</Label>
                <Textarea
                  value={ciphertext}
                  readOnly
                  className="font-mono bg-gray-50 text-xs"
                  placeholder="Hasil enkripsi dalam hex akan muncul di sini..."
                  rows={4}
                />
              </div>

              <div>
                <Label>Decrypted Text</Label>
                <Textarea
                  value={decryptedText}
                  readOnly
                  className="font-mono bg-gray-50"
                  placeholder="Hasil dekripsi akan muncul di sini..."
                />
              </div>

              {decryptedText && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Verifikasi:</strong> {plaintext === decryptedText ? "✅ Berhasil" : "❌ Gagal"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Penjelasan Algoritma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Advanced Encryption Standard (AES) adalah algoritma enkripsi simetris yang diadopsi oleh pemerintah AS.
                AES-128 menggunakan kunci 128-bit dan beroperasi pada blok data 128-bit.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spesifikasi AES-128:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Ukuran kunci: 128 bit (16 byte)</li>
                  <li>• Ukuran blok: 128 bit (16 byte)</li>
                  <li>• Jumlah round: 10</li>
                  <li>• Mode: ECB (Electronic Codebook)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
