export default async function getStaffByServiceId(serviceId: string) {
  console.log(serviceId);
  const getStaffByServiceId = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/staffs/serviceid?serviceid=${serviceId}`,
    {
      cache: "no-store",
    }
  );

  if (!getStaffByServiceId.ok) {
    // console.log("failed to fetch data");

    return [];
    // throw new Error("failed to fetch data");
  }

  const getStaffByServiceIdSuccess = await getStaffByServiceId.json();

  console.log(getStaffByServiceIdSuccess);

  return getStaffByServiceIdSuccess;
}
