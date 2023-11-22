export default async function getApartmentByStuId(studentId: string) {
  const getApartmentByStuId = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/apartment/studentid?StudentId=${studentId}`,
    {
      cache: "no-store",
    }
  );

  if (!getApartmentByStuId.ok) {
    return null;
  }

  const getApartmentByStuIdSuccess = await getApartmentByStuId.json();

  return getApartmentByStuIdSuccess;
}
