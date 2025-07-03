"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

function caesarEncrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char.match(/[A-Z]/)) {
        const charCode = char.charCodeAt(0) - 65
        const shiftedCode = (charCode + shift) % 26
        return String.fromCharCode(shiftedCode + 65)
      }
      return char
    })
    .join("")
}

function caesarDecrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char.match(/[A-Z]/)) {
        const charCode = char.charCodeAt(0) - 65
        const shiftedCode = (charCode - shift + 26) % 26
        return String.fromCharCode(shiftedCode + 65)
      }
      return char
    })
    .join("")
}

export default function CaesarPage() {
  const [plaintext, setPlaintext] = useState("KRIPTOGRAFI")
  const [shift, setShift] = useState(4)
  const [ciphertext, setCiphertext] = useState("")
  const [decryptedText, setDecryptedText] = useState("")

  const handleEncrypt = () => {
    const encrypted = caesarEncrypt(plaintext, shift)
    setCiphertext(encrypted)

    // Auto decrypt to verify
    const decrypted = caesarDecrypt(encrypted, shift)
    setDecryptedText(decrypted)
  }

  const handleReset = () => {
    setPlaintext("KRIPTOGRAFI")
    setShift(4)
    setCiphertext("")
    setDecryptedText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
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
            <div className="p-2 rounded-lg bg-blue-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Caesar Cipher</h1>
              <p className="text-gray-600">Soal 1 - 20 Poin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Masukkan teks dan kunci untuk enkripsi Caesar Cipher</CardDescription>
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
                <Label htmlFor="shift">Kunci (Shift)</Label>
                <Input
                  id="shift"
                  type="number"
                  value={shift}
                  onChange={(e) => setShift(Number.parseInt(e.target.value) || 0)}
                  min="0"
                  max="25"
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
              <CardDescription>Hasil enkripsi dan dekripsi Caesar Cipher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                Caesar Cipher adalah salah satu teknik enkripsi paling sederhana dan paling terkenal. Algoritma ini
                menggeser setiap huruf dalam plaintext dengan sejumlah posisi tetap dalam alfabet.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Rumus:</h4>
                <p className="font-mono text-sm">
                  Enkripsi: C = (P + K) mod 26
                  <br />
                  Dekripsi: P = (C - K) mod 26
                </p>
                <p className="text-sm text-gray-600 mt-2">Dimana P = plaintext, C = ciphertext, K = kunci (shift)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
