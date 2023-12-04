import { Inter } from 'next/font/google'
import './globals.css'
import { metadata } from './meta'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>{children}</div>
  )
}


