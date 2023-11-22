export default async function getCategoryById(categoryId: string) {
  const getCategoryById = await fetch(
    // `http://13.210.56.232/api/v1/categories/categoriesbyid?CategoriesId=${categoryId}`,
    `https://housevn.azurewebsites.net/api/v1/categories/categoriesbyid?CategoriesId=${categoryId}`,
    {
      cache: "no-store",
    }
  );

  if (!getCategoryById.ok) {
    throw new Error("Failed to fetch category by id");
  }

  const getCategoryByIdSuccess = await getCategoryById.json();

  return getCategoryByIdSuccess;
}
