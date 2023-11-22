// http://13.210.56.232/api/v1/bookings/bookingid?BookingId=

export default async function getBookingsByBookingId(id: string) {
  const getData = await fetch(
    // `http://13.210.56.232/api/v1/bookings/bookingid?BookingId=${id}`,
    `https://housevn.azurewebsites.net/api/v1/bookings/bookingid?BookingId=${id}`,
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
