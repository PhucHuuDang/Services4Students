import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();

  const { deleteId } = body;

  const deleteBy = "";

  // console.log(body);

  try {
    const createCategory = await axios.delete(
      // "http://13.210.56.232/api/v1/categories/categories",
      "https://housevn.azurewebsites.net/api/v1/categories/categories",
      {
        data: {
          categoryId: deleteId,
          deleteBy: deleteBy,
        },
      }
    );

    // console.log("first");
    // console.log(createCategory);

    if (createCategory.status === 200) {
      const createCategorySuccess = createCategory.data;

      return NextResponse.json(createCategorySuccess);
    } else {
      throw new Error("Create category have something wrong");
    }
  } catch (error: any) {
    throw new Error("Have something wrong!", error);
  }
}
