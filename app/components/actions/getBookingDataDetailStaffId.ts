export default async function getBookingDataDetailStaffId(staffId: string) {
  const getBookingDataDetailByStaffId = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/bookings/serviceOfbookingdetails/staffs/${staffId}
    `,
    {
      cache: "no-store",
    }
  );

  if (!getBookingDataDetailByStaffId.ok) {
    return [];
  }

  const getBookingDataDetailByStaffIdSuccess =
    await getBookingDataDetailByStaffId.json();

  return getBookingDataDetailByStaffIdSuccess;
}
