export async function getEmailUser(email: string) {
  // Sử dụng tham số email để tạo URL yêu cầu
  // const apiUrl = `http://13.210.56.232/api/v1/students/getStudentByEmailPassword?Email=${encodeURIComponent(
  const apiUrl = `https://housevn.azurewebsites.net/api/v1/students/getStudentByEmailPassword?Email=${encodeURIComponent(
    email
  )}&Password=MANAGER`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Fetch API user failed");
  }
  const user = await response.json();

  console.log(user);
  return user;
}
