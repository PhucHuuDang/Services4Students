export default async function getReportByStaffId(
  staffId: string,
  serviceId: string
) {
  const getReportByStaffId = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/reportworks/get-report-work-by-staffid-and-service-id?StaffId=${staffId}&ServiceId=${serviceId}
      
      `,
    {
      cache: "no-store",
    }
  );

  if (!getReportByStaffId.ok) {
    return [];
  }

  const getReportByStaffIdSuccess = await getReportByStaffId.json();

  return getReportByStaffIdSuccess;
}
