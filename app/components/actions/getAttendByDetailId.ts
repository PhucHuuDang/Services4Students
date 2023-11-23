// http://3.27.132.94/api/v1/attendreport/bookingdetailid?BookingDetailId=
export default async function getAttendByDetailId(detailId: string) {
  const response = await fetch(
    // `http://13.210.56.232/api/v1/attendreport/bookingdetailid?BookingDetailId=${detailId}`,
    `https://housevn.azurewebsites.net/api/v1/attendreport/bookingdetailid?BookingDetailId=${detailId}`,

    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    //   throw new Error("Failed to fetch api Staffs");
    return null;
  }

  const staff = await response.json();

  return staff;
}
