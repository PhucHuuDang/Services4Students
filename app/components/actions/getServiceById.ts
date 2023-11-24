// interface IParams {
//   listingId?: string;
// }

export default async function getServiceById(listingId: string) {
  //   const { listingId } = params;

  const getService = await fetch(
    `https://housevn.azurewebsites.net/api/v1/services/${listingId}`,
    {
      cache: "no-store",
    }
  );

  if (!getService.ok) {
    throw new Error("Failed to get Service by id");
  }

  const getServiceSuccess = await getService.json();
  return getServiceSuccess;
}
