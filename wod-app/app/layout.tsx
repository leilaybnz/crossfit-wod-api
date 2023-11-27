import type { Metadata } from 'next';
import { Red_Hat_Mono } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import CardsContainer from './components/CardsContainer';
import styles from './styles/layout.module.css';

const redHatMono = Red_Hat_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WOD',
  description: 'Workout of the day'
}

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={redHatMono.className}>
        <main className={styles.main}>
          <Nav/>
          <CardsContainer/>
          <Footer />
        </main>
      </body>
    </html>
  )
}
