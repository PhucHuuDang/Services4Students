export default async function getServices() {
  const services = await fetch(
    "https://housevn.azurewebsites.net/api/v1/services",
    {
      cache: "no-store",
    }
  );

  if (!services.ok) {
    throw new Error("Failed to fetch api services");
  }

  const getServicesSuccess = await services.json();
  return getServicesSuccess;
}
