export default async function getServiceOfBookingDataDetail(studentId: string) {
  const getServiceOfBookingDataDetail = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/bookings/serviceOfbookingdetails/${studentId}`,
    {
      cache: "no-store",
    }
  );

  if (!getServiceOfBookingDataDetail.ok) {
    return [];
  }

  const getServiceOfBookingDataDetailSuccess =
    await getServiceOfBookingDataDetail.json();

  return getServiceOfBookingDataDetailSuccess;
}
