export default async function getServices() {
  const services = await fetch("http://3.27.132.94/api/v1/services/services", {
    cache: "no-store",
  });

  if (!services.ok) {
    throw new Error("Failed to fetch api services");
  }

  const getServicesSuccess = await services.json();
  return getServicesSuccess;
}
