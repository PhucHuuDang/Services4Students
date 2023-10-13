import getServiceById from "@/app/components/actions/getServiceById";
import ClientOnly from "../../components/ClientOnly";
import ListingClient from "./ListingClient";
import EmptyState from "@/app/components/EmptyState";

// interface IParams {
//   listingId?: string;
// { params }: { params: IParams }
// }

type Params = {
  params: {
    listingId: string;
  };
};

const ListingPage = async ({ params: { listingId } }: Params) => {
  const getService = await getServiceById(listingId);

  // console.log(getService);

  if (!getService) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listingServiceById={getService} />
    </ClientOnly>
  );
  // }
};

export default ListingPage;
