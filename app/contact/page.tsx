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
  // const service_id = process.env.NEXT_PUBLIC_SERVICE_ID as string;

  // console.log(service_id);
  return (
    <ClientOnly>
      {/* <Container></Container> */}
      <ContactClient />
    </ClientOnly>
  );
}
