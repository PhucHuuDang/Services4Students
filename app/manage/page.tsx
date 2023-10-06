import getAllStudents from "../components/actions/getAllStudents";

import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ManageClient from "./ManageClient";

const ManagePage = async () => {
  const getAllStudentsInfo = await getAllStudents();

  console.log(getAllStudentsInfo);
  return (
    <ClientOnly>
      {/* <Container> */}
      <Heading title="Manage Users" />
      <ManageClient studentsInfo={getAllStudentsInfo} />
      {/* </Container> */}
    </ClientOnly>
  );
};

export default ManagePage;
