"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";

const ContactClient = () => {
  return (
    <Container>
      <Heading title="Contact" subtitle="Contact for us if you have any need" />
      <div
        className="
            pt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8

        "
      >
        Contact Page
      </div>
    </Container>
  );
};

export default ContactClient;
