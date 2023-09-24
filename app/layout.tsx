import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Services for students",
  description: "Services for students app",
};

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.className}>
        <ClientOnly>
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt=28">{children}</div>
      </body>
    </html>
  );
}
