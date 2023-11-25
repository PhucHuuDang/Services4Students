export default async function getServiceOfBookingDetail(id: string) {
  const getServiceOfBookingDetail = await fetch(
    // `http://13.210.56.232/api/v1/categories/categoriesbyid?CategoriesId=${categoryId}`,
    `https://housevn.azurewebsites.net/api/v1/bookings/serviceOfbookingdetails/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!getServiceOfBookingDetail.ok) {
    // throw new Error("Failed to fetch category by id");
    return [];
  }

  const getServiceOfBookingDetailSuccess =
    await getServiceOfBookingDetail.json();

  return getServiceOfBookingDetailSuccess;
}
