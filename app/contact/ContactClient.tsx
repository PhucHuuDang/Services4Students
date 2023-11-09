"use client";

import Container from "../components/Container";
import Maps from "../components/navbar/Maps";
import ContactForm from "../components/inputs/ContactForm";
import ContactInfo from "../components/listings/ContactInfo";

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
          {/* <div> */}
          <div className="pt-24 flex flex-row items-center justify-center gap-36">
            <ContactInfo />
            <ContactForm />
          </div>
          {/* </div> */}
          <hr className="mt-16 border-t-2 border-neutral-300" />
        </Container>
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
