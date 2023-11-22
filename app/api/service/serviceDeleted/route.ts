import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  //   const { deleteId } = params;
  //   { params }: { params: IParams }
  //
  //   const { deleteId } = query;

  const body = await request.json();

  const { deleteIdProperties } = body;

  //   console.log(deleteId);

  const deleteBy = "";

  //   if (!deleteId || typeof deleteId !== "string" || deleteId === undefined) {
  //     throw new Error("Invalid ID");
  //   }

  console.log("first");

  try {
    const deleteService = await axios.delete(
      "http://13.210.56.232/api/v1/services/services",
      {
        data: {
          serviceId: deleteIdProperties,
          deleteBy: deleteBy,
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
