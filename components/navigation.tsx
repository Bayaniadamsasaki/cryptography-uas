import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function Navigation() {
  return (
    <nav className="fixed top-4 right-4 z-50">
      <Link href="/">
        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </Link>
    </nav>
  )
}
