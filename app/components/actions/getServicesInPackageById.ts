export default async function getServicesInPackageId(listingComboId: string) {
  const response = await fetch(
    `http://3.27.132.94/api/v1/packages/packageandservicebypackageid?PackageId=${listingComboId}`,
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
