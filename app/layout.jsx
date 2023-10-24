import BodyWrapper from "./components/common/BodyWrapper";
import Footer from "./components/common/Footer";
import Navabar from "./components/common/Navbar";
import Providers from "./components/common/Providers";
import SessionProviders from "./components/common/SessionProviders";
import "./globals.css";
import { getSession, useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home | One Shop",
  description: "This is a Ecommerce Website.",
};

export default function RootLayout({ children }) {
  const session = getSession();
  return (
    <html lang="en">
      <link rel="icon" href="/assets/logo/favicon.png" sizes="any" />
      <SessionProviders session={session}>
        <Providers>
          <BodyWrapper inter={inter.className}>
            <Navabar />
            {children}
            <Footer />
          </BodyWrapper>
        </Providers>
      </SessionProviders>
    </html>
  );
}
