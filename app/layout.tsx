import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ConvexClientProvider } from "../components/custom/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // replace with your actual domain
  title: {
    default: "UBlog — Share your thoughts with the world",
    template: "%s | UBlog",
  },
  description: "A blog platform to write, share, and discover articles.",
  openGraph: {
    siteName: "UBlog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  authors: [{ name: "AJ" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <main className="max-w-7xl mx-auto w-full px-3 md:px-6 lg:px-8">
              {children}
            </main>
          </ConvexClientProvider>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
