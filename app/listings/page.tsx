import ClientOnly from "../components/ClientOnly";
import ListingClient from "./ListingClient";

interface IParams {
  listings?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  return (
    <ClientOnly>
      <ListingClient />
    </ClientOnly>
  );
};

export default ListingPage;
