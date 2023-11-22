export default async function getCategories() {
  const response = await fetch(
    // "http://13.210.56.232/api/v1/categories/categories",
    "https://housevn.azurewebsites.net/api/v1/categories/categories",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch get categories");
  }

  const categories = await response.json();
  return categories;
}
