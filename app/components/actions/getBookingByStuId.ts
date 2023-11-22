export default async function getBookingByStuId(stuId: string) {
  try {
    const getData = await fetch(
      // `http://13.210.56.232/api/v1/bookings/studentid?StudentId=${stuId}`,
      `https://housevn.azurewebsites.net/api/v1/bookings/studentid?StudentId=${stuId}`,
      {
        cache: "no-store",
      }
    );

    if (!getData.ok) {
      // throw new Error("Failed fetch data get booking by student id");
      return null;
    }

    const res = await getData.json();

    return res;
  } catch (error) {
    console.log("Error", error);
  }
}
