import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <ClientOnly>
      <ContactClient />
    </ClientOnly>
  );
}
