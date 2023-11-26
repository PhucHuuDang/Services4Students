// http://3.27.132.94/api/v1/bookingdetail
export default async function getBookingDetailByStaffId(id: string) {
  const getData = await fetch(
    `https://housevn.azurewebsites.net/api/v1/bookings/serviceOfbookingdetails/staffs/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!getData.ok) {
    throw new Error("Failed to get data booking detail");
  }

  const getDataBookingDetail = getData.json();

  return getDataBookingDetail;
}
