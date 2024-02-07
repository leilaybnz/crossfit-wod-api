import type { Metadata } from "next";
import { Red_Hat_Mono } from "next/font/google";
import Footer from "./components/Footer";
import LanguageButton from "./components/LanguageButton";
import Nav from "./components/Nav";
import "./globals.css";
import styles from "./styles/layout.module.css";

const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WOD",
  description: "Workout of the day",
  // icons: {
  //   icon: "/icon-gym.png",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={redHatMono.className}>
        <main className={styles.main}>
          <Nav />
          {children}
          <LanguageButton />
          <Footer />
        </main>
      </body>
    </html>
  );
}
