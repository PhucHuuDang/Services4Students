export default async function getRegions() {
  const response = await fetch(
    "https://housevn.azurewebsites.net/api/v1/region/get-all-region",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch api Staffs");
  }

  const regions = await response.json();

  return regions;
}
