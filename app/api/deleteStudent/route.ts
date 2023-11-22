import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const body = await request.json();

  const { deleteId } = body;

  //   const deleteBy = "";

  console.log(deleteId);

  try {
    const deleteUser = await axios.delete(
      // "http://13.210.56.232/api/v1/students/delete-student-by-id",
      "https://housevn.azurewebsites.net/api/v1/students/delete-student-by-id",
      {
        data: {
          id: deleteId,
          //   deleteBy: deleteBy,
        },
      }
    );

    console.log(deleteUser);

    if (deleteUser.status === 200) {
      const deleteSuccess = deleteUser.data;
      return NextResponse.json(deleteSuccess);
    }
  } catch (error: any) {
    console.log("Failed to delete");

    throw new Error("Have some thing wrong with delete staff", error);
  }
}
