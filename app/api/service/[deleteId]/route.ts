import axios from "axios";
import { NextResponse } from "next/server";

// interface IParams {
//   deleteId: string;
//   //   { params }: { params: IParams }
// }

type Params = {
  params: {
    deleteId: string;
  };
  // { params: { deleteId } }: Params,
};

export async function DELETE(
  { params: { deleteId } }: Params,
  request: Request
) {
  // const { deleteId } = params;
  // { params }: { params: IParams }

  // const { deleteId } = query;

  console.log(deleteId);

  if (!deleteId || typeof deleteId !== "string") {
    throw new Error("Invalid ID");
  }

  console.log("first");

  try {
    const deleteService = await axios.delete(
      `http://3.27.132.94/api/v1/services/services/${deleteId}`
    );
    // const deleteService = await axios.delete(
    //   "http://3.27.132.94/api/v1/services/services",
    //   {
    //     // deleteId:
    //   }
    // );

    console.log(deleteService.status);

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
