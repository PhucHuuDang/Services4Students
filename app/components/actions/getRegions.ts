export default async function getRegions() {
  const response = await fetch(
    "http://13.210.56.232/api/v1/region/get-all-region",
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
