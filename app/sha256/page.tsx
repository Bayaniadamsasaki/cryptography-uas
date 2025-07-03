"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Hash, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

// Simple SHA-256 implementation (for educational purposes)
// Note: This is a simplified version, real SHA-256 is more complex
async function simpleSHA256(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export default function SHA256Page() {
  const [password, setPassword] = useState("MySecurePassword123")
  const [modifiedPassword, setModifiedPassword] = useState("MySecurePassword124")
  const [originalHash, setOriginalHash] = useState("")
  const [modifiedHash, setModifiedHash] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [customPassword, setCustomPassword] = useState("")
  const [customHash, setCustomHash] = useState("")

  const handleHashPasswords = async () => {
    const originalResult = await simpleSHA256(password)
    const modifiedResult = await simpleSHA256(modifiedPassword)

    setOriginalHash(originalResult)
    setModifiedHash(modifiedResult)
  }

  const handleHashCustom = async () => {
    if (customPassword) {
      const result = await simpleSHA256(customPassword)
      setCustomHash(result)
    }
  }

  const handleReset = () => {
    setPassword("MySecurePassword123")
    setModifiedPassword("MySecurePassword124")
    setOriginalHash("")
    setModifiedHash("")
    setCustomPassword("")
    setCustomHash("")
  }

  const countDifferentChars = (str1: string, str2: string): number => {
    return str1.split("").reduce((count, char, index) => {
      return char !== str2[index] ? count + 1 : count
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
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
            <div className="p-2 rounded-lg bg-red-500">
              <Hash className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SHA-256 Hash</h1>
              <p className="text-gray-600">Soal 5 - 20 Poin</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Section */}
          <Card>
            <CardHeader>
              <CardTitle>Demonstrasi Perubahan Hash</CardTitle>
              <CardDescription>Lihat bagaimana hash berubah dengan perubahan 1 karakter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="original">Password Asli</Label>
                <div className="relative">
                  <Input
                    id="original"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-mono pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="modified">Password Diubah (1 karakter)</Label>
                <div className="relative">
                  <Input
                    id="modified"
                    type={showPassword ? "text" : "password"}
                    value={modifiedPassword}
                    onChange={(e) => setModifiedPassword(e.target.value)}
                    className="font-mono pr-10"
                  />
                </div>
              </div>

              <Button onClick={handleHashPasswords} className="w-full">
                Generate Hash
              </Button>

              {originalHash && (
                <div className="space-y-3">
                  <div>
                    <Label>Hash Password Asli</Label>
                    <Textarea value={originalHash} readOnly className="font-mono text-xs bg-gray-50" rows={2} />
                  </div>

                  <div>
                    <Label>Hash Password Diubah</Label>
                    <Textarea value={modifiedHash} readOnly className="font-mono text-xs bg-gray-50" rows={2} />
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Karakter berbeda:</strong> {countDifferentChars(originalHash, modifiedHash)} dari{" "}
                      {originalHash.length} karakter
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Hash sama:</strong> {originalHash === modifiedHash ? "Ya" : "Tidak"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hash Password Custom</CardTitle>
              <CardDescription>Masukkan password Anda sendiri untuk di-hash</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="custom">Password Anda</Label>
                <div className="relative">
                  <Input
                    id="custom"
                    type={showPassword ? "text" : "password"}
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className="font-mono pr-10"
                  />
                </div>
              </div>

              <Button onClick={handleHashCustom} className="w-full" disabled={!customPassword}>
                Hash Password
              </Button>

              {customHash && (
                <div>
                  <Label>Hash SHA-256</Label>
                  <Textarea value={customHash} readOnly className="font-mono text-xs bg-gray-50" rows={3} />
                  <p className="text-sm text-gray-500 mt-2">Panjang hash: {customHash.length} karakter (256 bit)</p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Penjelasan SHA-256</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                SHA-256 (Secure Hash Algorithm 256-bit) adalah fungsi hash kriptografi yang menghasilkan nilai hash
                256-bit (32 byte) dari input dengan panjang berapa pun.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Karakteristik SHA-256:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Output selalu 256 bit (64 karakter hex)</li>
                  <li>• Deterministik: input sama = output sama</li>
                  <li>• Avalanche effect: perubahan kecil = hash sangat berbeda</li>
                  <li>• One-way function: sulit untuk membalik hash</li>
                  <li>• Collision resistant: sulit menemukan dua input dengan hash sama</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
