export default async function getAttendByStudentId(
  studentId: string,
  serviceId: string
) {
  const getAttendByStudentId = await fetch(
    // `http://13.210.56.232/api/v1/apartment/studentid?StudentId=${studentId}`,
    `https://housevn.azurewebsites.net/api/v1/attendreport/get-attendreport-by-student-id-and-service-id?StudentId=${studentId}&ServiceId=${serviceId}
    
    
    `,
    {
      cache: "no-store",
    }
  );

  if (!getAttendByStudentId.ok) {
    return [];
  }

  const getAttendByStudentIdSuccess = await getAttendByStudentId.json();

  return getAttendByStudentIdSuccess;
}
