"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import Logo from "../components/navbar/Logo";
import UserMenu from "../components/navbar/UserMenu";
import ContactInfo from "./ContactInfo";

interface ContactClientProps {
  email?: string;
  password?: string;
  studentName?: string;
}

const ContactClient = ({ user }: any) => {
  // console.log(user);
  return (
    <>
      <div className="fixed bg-white w-full z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-1 md:w-full pr-8">
              <Logo />
              <UserMenu />
            </div>
          </Container>
        </div>
        {/* move this block below later */}
      </div>
      <div className="p-20 w-full h-auto">
        <ContactInfo />
        {/* <div>{user.email}</div>
        <div>{user.password}</div>
        <div>{user.studentName}</div> */}
        <div>{}</div>
      </div>
    </>
  );
};

export default ContactClient;
