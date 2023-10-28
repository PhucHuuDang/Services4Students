export default async function getRegions() {
  const response = await fetch(
    "http://3.27.132.94/api/v1/region/get-all-region",
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
