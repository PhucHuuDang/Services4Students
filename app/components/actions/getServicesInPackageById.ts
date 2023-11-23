export default async function getServicesInPackageId(listingComboId: string) {
  const response = await fetch(
    // `http://13.210.56.232/api/v1/packages/packageandservicebypackageid?PackageId=${listingComboId}`,
    `https://housevn.azurewebsites.net/api/v1/packages/${listingComboId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data get services and package by id");
  }

  const getServicesInAPackageByIdSuccess = response.json();

  return getServicesInAPackageByIdSuccess;
}
