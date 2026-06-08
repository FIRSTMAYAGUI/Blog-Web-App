import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with go back button */}
      <header className="p-4">
        <Link className={buttonVariants({variant: 'secondary'})} href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Link>
      </header>

      {/* Centered content area */}
      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>
    </div>
  )
}