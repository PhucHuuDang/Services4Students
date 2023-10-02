export async function getUsers() {
  const response = await fetch("");

  if (!response.ok) {
    throw new Error("Fetch API user failed");
  }
  const user = await response.json();
  return user;
}
