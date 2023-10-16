export default async function getCategoryById(categoryId: string) {
  const getCategoryById = await fetch(
    `http://3.27.132.94/api/v1/categories/categoriesbyid?CategoriesId=${categoryId}`
  );

  if (!getCategoryById.ok) {
    throw new Error("Failed to fetch category by id");
  }

  const getCategoryByIdSuccess = await getCategoryById.json();

  return getCategoryByIdSuccess;
}
