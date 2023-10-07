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
      <div className="pt-20">
        <ContactInfo />
      </div>
    </>
  );
};

export default ContactClient;
