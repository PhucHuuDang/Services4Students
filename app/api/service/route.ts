import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    serviceName,
    serviceDescription,
    price,
    imageURL,
    categoryId,
    createBy,
  } = body;

  // console.log(body);

  try {
    const createService = await axios.post(
      "http://13.210.56.232/api/v1/services/services",
      {
        serviceName: serviceName,
        serviceDescription: serviceDescription,
        price: price,
        imageURL: imageURL,
        categoryId: categoryId,
        createBy: createBy,
      }
    );

    // console.log(createService);

    if (createService.status === 200) {
      const newService = createService.data;

      console.log(newService);

      return NextResponse.json(newService);
    }
  } catch (error: any) {
    throw new Error("Create service failed!", error);
  }
}
