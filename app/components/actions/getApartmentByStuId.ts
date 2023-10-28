export default async function getApartmentByStuId(studentId: string) {
  const getApartmentByStuId = await fetch(
    `http://3.27.132.94/api/v1/apartment/studentid?StudentId=${studentId}`
  );

  if (!getApartmentByStuId.ok) {
    return null;
  }

  const getApartmentByStuIdSuccess = await getApartmentByStuId.json();

  return getApartmentByStuIdSuccess;
}
