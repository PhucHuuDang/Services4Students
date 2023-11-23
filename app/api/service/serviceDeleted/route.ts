import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();

  const { deleteIdProperties } = body;

  console.log("first");

  try {
    const deleteService = await axios.delete(
      // "http://13.210.56.232/api/v1/services/services",
      "https://housevn.azurewebsites.net/api/v1/services",
      {
        data: {
          serviceId: deleteIdProperties,
        },
      }
    );

    // console.log(deleteService.status);

    if (deleteService.status === 200) {
      const deleteSuccess = deleteService.data;

      return NextResponse.json(deleteSuccess);
    } else {
      console.log("failed to delete");
      throw new Error("Delete was failed");
    }
  } catch (error: any) {
    console.log("failed to delete");

    throw new Error("Have some thing wrong with delete service", error);
  }
}
