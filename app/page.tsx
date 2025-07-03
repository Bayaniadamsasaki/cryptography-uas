import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileKey, Hash, Key, Lock, Shield } from "lucide-react"
import Link from "next/link"

const algorithms = [
  {
    id: "caesar",
    title: "Caesar Cipher",
    description: "Algoritma enkripsi klasik dengan pergeseran karakter",
    icon: Shield,
    color: "bg-blue-500",
    points: 20,
  },
  {
    id: "vigenere",
    title: "Vigenère Cipher",
    description: "Cipher polyalphabetic dengan kata kunci",
    icon: Key,
    color: "bg-green-500",
    points: 20,
  },
  {
    id: "aes",
    title: "AES Encryption",
    description: "Advanced Encryption Standard (AES-128)",
    icon: Lock,
    color: "bg-purple-500",
    points: 20,
  },
  {
    id: "rsa",
    title: "RSA Cipher",
    description: "Algoritma kriptografi kunci publik",
    icon: FileKey,
    color: "bg-orange-500",
    points: 20,
  },
  {
    id: "sha256",
    title: "SHA-256 Hash",
    description: "Fungsi hash kriptografi untuk password",
    icon: Hash,
    color: "bg-red-500",
    points: 20,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aplikasi Kriptografi</h1>
          <p className="text-xl text-gray-600 mb-2">Ujian Akhir Semester - Teknologi Informasi</p>
        </div>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {algorithms.map((algo) => {
            const IconComponent = algo.icon
            return (
              <Card key={algo.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${algo.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{algo.title}</CardTitle>
                      <span className="text-sm text-gray-500">({algo.points} poin)</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{algo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/${algo.id}`}>
                    <Button className="w-full">Buka Algoritma</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
