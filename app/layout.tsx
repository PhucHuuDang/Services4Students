import ToasterProvider from "@/providers/ToastProviders";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import getCurrentUser from "./components/actions/getCurrentUser";
import RegisterStaffModal from "./components/modals/RegisterStaffModal";
import AddServicesModal from "./components/modals/AddServiceModal";
import getCategories from "./components/actions/getCategories";
import CategoryModal from "./components/modals/CategoryModal";

export const metadata = {
  title: "Services for students",
  description: "Services for students app",
};

const nunito = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const getCategoryId = await getCategories();

  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <AddServicesModal getCategoryId={getCategoryId} />
          <CategoryModal />
          <LoginModal />
          <RegisterModal />
          <RegisterStaffModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt=28">{children}</div>
      </body>
    </html>
  );
}
