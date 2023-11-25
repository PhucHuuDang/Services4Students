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
import getServices from "./components/actions/getServices";
import ComboModal from "./components/modals/ComboModal";
import Provider from "../providers/Provider";
import getRoleUser from "./components/actions/getRoleUser";
import { BookingProvider } from "@/providers/BookingProvider";
import CategoriesModal from "./components/modals/CategoriesModal";
import getServiceOfBookingDetail from "./components/actions/getServiceOfBookingDetail";
import { MantineProvider } from "@mantine/core";

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
  const getService = await getServices();
  const getRole = await getRoleUser();

  const servicesOfBookingDetails = await getServiceOfBookingDetail(
    getRole && typeof getRole !== "string" && "userIdInTableDb" in getRole
      ? getRole.userIdInTableDb
      : ""
  );

  // console.log(getRole);

  return (
    <html lang="en">
      <body suppressHydrationWarning className={nunito.className}>
        <Provider>
          <MantineProvider>
            <ClientOnly>
              <ToasterProvider />
              <SearchModal getService={getService} />
              <AddServicesModal getCategoryId={getCategoryId} />
              <CategoryModal />
              <LoginModal />
              <RegisterModal />
              <RegisterStaffModal getCatagories={getCategoryId} />
              <ComboModal getService={getService} />
              <CategoriesModal categories={getCategoryId} />

              <Navbar
                currentUser={currentUser}
                getRole={getRole}
                getService={getService}
                servicesOfBookingDetails={servicesOfBookingDetails}
              />
            </ClientOnly>
            <BookingProvider>
              <div className="pb-20 pt=28">{children}</div>
            </BookingProvider>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
