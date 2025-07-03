"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileKey } from "lucide-react"
import Link from "next/link"

function gcd(a: number, b: number): number {
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a
}

function modInverse(e: number, phi: number): number {
  function extendedGcd(a: number, b: number): [number, number, number] {
    if (a === 0) return [b, 0, 1]
    const [gcd, x1, y1] = extendedGcd(b % a, a)
    const x = y1 - Math.floor(b / a) * x1
    const y = x1
    return [gcd, x, y]
  }

  const [gcdVal, x] = extendedGcd(e, phi)
  if (gcdVal !== 1) throw new Error("Modular inverse tidak ada")
  return ((x % phi) + phi) % phi
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1
  base = base % mod
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod
    }
    exp = Math.floor(exp / 2)
    base = (base * base) % mod
  }
  return result
}

interface RSAResult {
  p: number
  q: number
  n: number
  phi: number
  e: number
  d: number
  message: number
  ciphertext: number
  decrypted: number
}

export default function RSAPage() {
  const [p, setP] = useState(7)
  const [q, setQ] = useState(11)
  const [message, setMessage] = useState(9)
  const [result, setResult] = useState<RSAResult | null>(null)
  const [error, setError] = useState("")

  const calculateRSA = () => {
    try {
      setError("")

      // Hitung n = p * q
      const n = p * q

      // Hitung φ(n) = (p-1) * (q-1)
      const phi = (p - 1) * (q - 1)

      // Pilih e yang relatif prima dengan φ(n)
      let e = 3
      while (gcd(e, phi) !== 1) {
        e += 2
      }

      // Hitung d (private key)
      const d = modInverse(e, phi)

      // Enkripsi: c = m^e mod n
      const ciphertext = modPow(message, e, n)

      // Dekripsi: m = c^d mod n
      const decrypted = modPow(ciphertext, d, n)

      setResult({
        p,
        q,
        n,
        phi: phi,
        e,
        d,
        message,
        ciphertext,
        decrypted,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    }
  }

  const handleReset = () => {
    setP(7)
    setQ(11)
    setMessage(9)
    setResult(null)
    setError("")
  }

  useEffect(() => {
    calculateRSA()
  }, [p, q, message])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
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
            <div className="p-2 rounded-lg bg-orange-500">
              <FileKey className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RSA Cipher</h1>
              <p className="text-gray-600">Soal 4 - 20 Poin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Masukkan bilangan prima dan pesan untuk RSA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="p">Bilangan Prima p</Label>
                  <Input
                    id="p"
                    type="number"
                    value={p}
                    onChange={(e) => setP(Number.parseInt(e.target.value) || 7)}
                    min="2"
                  />
                </div>
                <div>
                  <Label htmlFor="q">Bilangan Prima q</Label>
                  <Input
                    id="q"
                    type="number"
                    value={q}
                    onChange={(e) => setQ(Number.parseInt(e.target.value) || 11)}
                    min="2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Pesan (m)</Label>
                <Input
                  id="message"
                  type="number"
                  value={message}
                  onChange={(e) => setMessage(Number.parseInt(e.target.value) || 9)}
                  min="1"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateRSA} className="flex-1">
                  Hitung RSA
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hasil Perhitungan</CardTitle>
              <CardDescription>Langkah-langkah dan hasil RSA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>n = p × q</strong>
                      <br />
                      {result.n} = {result.p} × {result.q}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <strong>φ(n) = (p-1)(q-1)</strong>
                      <br />
                      {result.phi} = ({result.p}-1)({result.q}-1)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded">
                      <strong>Public Key (e, n)</strong>
                      <br />({result.e}, {result.n})
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <strong>Private Key (d, n)</strong>
                      <br />({result.d}, {result.n})
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Enkripsi & Dekripsi:</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Pesan asli (m):</strong> {result.message}
                      </p>
                      <p>
                        <strong>Ciphertext (c):</strong> {result.ciphertext}
                      </p>
                      <p>
                        <strong>Decrypted:</strong> {result.decrypted}
                      </p>
                      <p className="text-green-700">
                        <strong>Verifikasi:</strong> {result.message === result.decrypted ? "✅ Berhasil" : "❌ Gagal"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Penjelasan Algoritma RSA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                RSA adalah algoritma kriptografi asimetris yang menggunakan sepasang kunci: kunci publik untuk enkripsi
                dan kunci privat untuk dekripsi.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Langkah-langkah RSA:</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Pilih dua bilangan prima p dan q</li>
                  <li>Hitung n = p × q</li>
                  <li>Hitung φ(n) = (p-1) × (q-1)</li>
                  <li>Pilih e yang relatif prima dengan φ(n)</li>
                  <li>Hitung d ≡ e⁻¹ (mod φ(n))</li>
                  <li>Enkripsi: c ≡ mᵉ (mod n)</li>
                  <li>Dekripsi: m ≡ cᵈ (mod n)</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
