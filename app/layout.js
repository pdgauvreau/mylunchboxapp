import { Inter } from 'next/font/google'
import './globals.css'
import BottomNav from './components/BottomNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyLunchBox',
  description: 'Share your food journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="pb-16"> {/* Add padding bottom to account for nav bar */}
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
