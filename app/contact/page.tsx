import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import { getEmailUser } from "../components/actions/getEmailUser";
import { getUsers } from "../components/actions/getUsers";
import ContactClient from "./ContactClient";

interface IParams {
  email?: string;
  password?: string;
  studentName?: string;
}

export default async function ContactPage() {
  return (
    <ClientOnly>
      <Container>
        <ContactClient />
      </Container>
    </ClientOnly>
  );
}
