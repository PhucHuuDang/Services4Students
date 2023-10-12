import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { categoryName, createBy } = body;

  // console.log(body);

  try {
    const createCategory = await axios.post(
      "http://3.27.132.94/api/v1/categories/categories",
      {
        categoryName: categoryName,
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
