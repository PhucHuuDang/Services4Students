"use client";

import Container from "../components/Container";
import Maps from "../components/navbar/Maps";
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
        <Container>
          <ContactInfo />
        </Container>
        {/* <div className="flex flex-col h-auto">
          <div
            className="
              h-screen
              
              "
          >
            <Maps />
          </div>
        </div> */}
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
