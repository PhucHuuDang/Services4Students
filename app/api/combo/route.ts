import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    listServiceId,
    quantity,
    packageDescription,
    packageName,
    discountPercent,
    imageUrl,
  } = body;

  console.log(body);

  try {
    const createPackage = await axios.post(
      // "http://13.210.56.232/api/v1/packages/packages",
      "https://housevn.azurewebsites.net/api/v1/packages",
      {
        listServiceId: listServiceId,
        quantity: quantity,
        packageDescription: packageDescription,
        packageName: packageName,
        discountPercent: discountPercent,
        imageUrl: imageUrl,
      }
    );

    // console.log(createPackage);

    if (createPackage.status === 200) {
      const newPackage = createPackage.data;

      return NextResponse.json(newPackage);
    }
  } catch (error: any) {
    throw new Error("Create package failed!", error);
  }
}
