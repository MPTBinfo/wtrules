import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Madhya Pradesh Water Tourism Rules & Permission Guide',
  description: 'Hindi-English reference for Madhya Pradesh water tourism permission procedures, fee structure, notified waterbodies, safety, compliance, forms and LOA formats.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
