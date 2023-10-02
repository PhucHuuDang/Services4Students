"use client";

import ContactClient from "@/app/contact/ContactClient";
// import ContactClient from "@/app/contact/ContactClient";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Banner from "./Banner";

interface NavbarProps {
  currentUser?: any | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const isMainPage = useSearchParams();
  const search = isMainPage?.get("email");

  // console.log(search);

  // check the route of the url, whether route /contact or not, if true return null, so this Element will be empty
  const pathName = usePathname();
  if (pathName === "/contact") {
    console.log("success");
    return null;
  }

  return (
    <div className="fixed bg-white w-full z-10 shadow-sm">
      <div className="py-4 border-b-[1px] z-10">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-1 md:w-full">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* <div className="z-0 block h-screen overflow-hidden ">
        <Banner />
      </div> */}
      {/* <Container>
        <div className="absolute block bottom-0 left-0 right-0 bg-white max-h-0">
          <div className="mt-10 p-20">
            <div>information in here</div>
            <div>information in here</div>
          </div>
        </div>
      </Container> */}
    </div>
  );
};

export default Navbar;
