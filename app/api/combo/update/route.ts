import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const {
    packageId,
    quantity,
    listServiceId,
    packageDescription,
    packageName,
    imageUrl,
  } = body;

  // console.log(body);

  try {
    const createPackage = await axios.put(
      // "http://13.210.56.232/api/v1/packages/packages",
      "https://housevn.azurewebsites.net/api/v1/packages",
      {
        packageId: packageId,
        quantity: quantity,
        listServiceId: listServiceId,
        packageDescription: packageDescription,
        packageName: packageName,
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
