"use client";

import { useEffect, memo, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useTokenStore from "@/app/hooks/useTokenStore";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import useVerifyToken from "@/app/hooks/useVerifyToken";
import { useSession } from "next-auth/react";
import { ServiceOfBookingDetails, ServiceProp } from "@/app/types";

interface NavbarProps {
  currentUser?: any | null;
  getRole?: any | null;
  getService?: any;
  servicesOfBookingDetails: ServiceOfBookingDetails[];
}

interface TokenProps {
  email?: string;
  uid?: string;
  role?: string;
  jti?: string;
  iss?: string;
  aud?: string;
  exp?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  getRole,
  getService,
  servicesOfBookingDetails,
}) => {
  const router = useRouter();
  const isMainPage = useSearchParams();
  const pathName = usePathname();
  const search = isMainPage?.get("email");
  const useToken = useTokenStore();

  // const { data: session } = useSession();
  // console.log(session?.user);

  // console.log(getRole);

  // const useResultVerifyToken: any | TokenProps = useVerifyToken();
  // let role = "";

  // useEffect(() => {
  //   if (currentUser) {
  //     useToken.setToken(currentUser.token);
  //   }
  //   // console.log(currentUser);
  //   // if (!useResultVerifyToken) {
  //   //   return;
  //   // }
  // }, [currentUser]);

  // console.log(useToken.token);

  // if (useResultVerifyToken) {
  //   role = useResultVerifyToken.role;
  //   console.log(useResultVerifyToken.role);
  //   console.log(useResultVerifyToken.email);
  // }

  // console.log("re-render 3");

  // check the route of the url, whether route /contact or not, if true return null, so this Element will be empty

  // if (pathName === "/contact") {
  //   console.log("success");
  //   return null;
  // }

  // console.log(servicesOfBookingDetails.length);

  return (
    <div className="fixed bg-white w-full z-20 shadow-sm">
      <div className="py-4 border-b-[1px] z-10">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-1 md:w-full">
            <Logo />
            <Search services={getService} />
            <UserMenu
              // currentUser={currentUser}
              servicesOfBookingDetails={servicesOfBookingDetails}
              currentUser={getRole}
              isAdmin={getRole ? getRole.role : ""}
            />
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

export default memo(Navbar);
