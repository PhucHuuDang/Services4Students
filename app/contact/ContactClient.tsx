"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import Logo from "../components/navbar/Logo";
import Maps from "../components/navbar/Maps";
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
      <div className="pt-20">
        <ContactInfo />
        <div className="flex flex-col h-auto">
          {/* <div
            className="
              h-screen
              
              "
          >
            <Maps />
          </div> */}
        </div>
      </div>
      <div
        className="
              h-auto
              w-auto
              "
      >
        <Maps />
      </div>
    </>
  );
};

export default ContactClient;
