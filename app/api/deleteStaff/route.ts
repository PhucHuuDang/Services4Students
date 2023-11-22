import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();

  const { deleteId } = body;

  const deleteBy = "";

  try {
    const deleteStaff = await axios.delete(
      // "http://13.210.56.232/api/v1/staffs/staffs",
      "https://housevn.azurewebsites.net/api/v1/staffs/staffs",
      {
        data: {
          id: deleteId,
          deleteBy: deleteBy,
        },
      }
    );

    // console.log(deleteStaff);

    if (deleteStaff.status === 200) {
      const deleteSuccess = deleteStaff.data;
      return NextResponse.json(deleteSuccess);
    }
  } catch (error: any) {
    console.log("Failed to delete");

    throw new Error("Have some thing wrong with delete staff", error);
  }
}
