export default async function getAllStaffs() {
  const response = await fetch(
    "http://3.27.132.94/api/v1/staffs/get-all-staff"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch api Staffs");
  }

  const staff = await response.json();

  return staff;
}
