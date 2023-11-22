import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { categoryName, imageUrl, createBy } = body;

  // console.log(body);

  try {
    const createCategory = await axios.post(
      // "http://13.210.56.232/api/v1/categories/categories",
      "https://housevn.azurewebsites.net/api/v1/categories/categories",
      {
        categoryName: categoryName,
        imageUrl: imageUrl,
        createBy: createBy,
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
