// interface IParams {
//   listingId?: string;
// }

export default async function getServiceById(listingId: string) {
  //   const { listingId } = params;

  const getService = await fetch(
    `http://3.27.132.94/api/v1/services/serivcesbyId?SerivceId=${listingId}`
  );

  if (!getService.ok) {
    throw new Error("Failed to get Service by id");
  }

  const getServiceSuccess = await getService.json();
  return getServiceSuccess;
}
