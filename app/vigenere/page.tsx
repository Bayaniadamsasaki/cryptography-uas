"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Key } from "lucide-react"
import Link from "next/link"

function generateKey(text: string, keyword: string): string {
  let key = ""
  let keywordIndex = 0

  for (const char of text) {
    if (char.match(/[A-Z]/)) {
      key += keyword[keywordIndex % keyword.length]
      keywordIndex++
    } else {
      key += char
    }
  }

  return key.toUpperCase()
}

function vigenereEncrypt(text: string, keyword: string): { ciphertext: string; key: string } {
  const plaintext = text.toUpperCase()
  const key = generateKey(plaintext, keyword.toUpperCase())
  let result = ""

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i]
    if (char.match(/[A-Z]/)) {
      const plainNum = char.charCodeAt(0) - 65
      const keyNum = key[i].charCodeAt(0) - 65
      const cipherNum = (plainNum + keyNum) % 26
      result += String.fromCharCode(cipherNum + 65)
    } else {
      result += char
    }
  }

  return { ciphertext: result, key }
}

function vigenereDecrypt(ciphertext: string, keyword: string): string {
  const cipher = ciphertext.toUpperCase()
  const key = generateKey(cipher, keyword.toUpperCase())
  let result = ""

  for (let i = 0; i < cipher.length; i++) {
    const char = cipher[i]
    if (char.match(/[A-Z]/)) {
      const cipherNum = char.charCodeAt(0) - 65
      const keyNum = key[i].charCodeAt(0) - 65
      const plainNum = (cipherNum - keyNum + 26) % 26
      result += String.fromCharCode(plainNum + 65)
    } else {
      result += char
    }
  }

  return result
}

export default function VigenerePage() {
  const [plaintext, setPlaintext] = useState("KRIPTOGRAFI")
  const [keyword, setKeyword] = useState("KEY")
  const [ciphertext, setCiphertext] = useState("")
  const [extendedKey, setExtendedKey] = useState("")
  const [decryptedText, setDecryptedText] = useState("")

  const handleEncrypt = () => {
    const result = vigenereEncrypt(plaintext, keyword)
    setCiphertext(result.ciphertext)
    setExtendedKey(result.key)

    // Auto decrypt to verify
    const decrypted = vigenereDecrypt(result.ciphertext, keyword)
    setDecryptedText(decrypted)
  }

  const handleReset = () => {
    setPlaintext("KRIPTOGRAFI")
    setKeyword("KEY")
    setCiphertext("")
    setExtendedKey("")
    setDecryptedText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
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
            <div className="p-2 rounded-lg bg-green-500">
              <Key className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vigenère Cipher</h1>
              <p className="text-gray-600">Soal 2 - 20 Poin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Masukkan plaintext dan keyword untuk Vigenère Cipher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="plaintext">Plaintext</Label>
                <Input
                  id="plaintext"
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  placeholder="Masukkan teks..."
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Masukkan keyword..."
                  className="font-mono"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEncrypt} className="flex-1">
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
              <CardDescription>Hasil enkripsi dan dekripsi Vigenère Cipher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Extended Key</Label>
                <Textarea
                  value={extendedKey}
                  readOnly
                  className="font-mono bg-gray-50"
                  placeholder="Kunci yang diperpanjang akan muncul di sini..."
                />
              </div>

              <div>
                <Label>Ciphertext</Label>
                <Textarea
                  value={ciphertext}
                  readOnly
                  className="font-mono bg-gray-50"
                  placeholder="Hasil enkripsi akan muncul di sini..."
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
                    <strong>Verifikasi:</strong>{" "}
                    {plaintext.toUpperCase() === decryptedText ? "✅ Berhasil" : "❌ Gagal"}
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
                Vigenère Cipher adalah metode enkripsi polyalphabetic yang menggunakan serangkaian Caesar cipher
                berdasarkan huruf-huruf kata kunci. Setiap huruf plaintext dienkripsi dengan Caesar cipher yang berbeda.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Rumus:</h4>
                <p className="font-mono text-sm">
                  Enkripsi: C[i] = (P[i] + K[i]) mod 26
                  <br />
                  Dekripsi: P[i] = (C[i] - K[i]) mod 26
                </p>
                <p className="text-sm text-gray-600 mt-2">Dimana K[i] adalah huruf ke-i dari keyword yang diulang</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
