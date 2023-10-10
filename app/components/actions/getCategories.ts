export default async function getCategories() {
  const response = await fetch(
    "http://3.27.132.94/api/v1/categories/categories",
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
