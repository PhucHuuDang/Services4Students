"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import Logo from "../components/navbar/Logo";
import UserMenu from "../components/navbar/UserMenu";
import ContactInfo from "./ContactInfo";

const ContactClient = () => {
  return (
    <div className="fixed bg-white w-full z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-1 md:w-full">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Container>
        <div className="mt-5 w-full h-auto">
          <ContactInfo />
        </div>
      </Container>
    </div>
  );
};

export default ContactClient;
