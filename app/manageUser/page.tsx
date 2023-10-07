import getAllStudents from "../components/actions/getAllStudents";

import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ManageUserClient from "./ManageUserClient";

const ManageUserPage = async () => {
  const getAllStudentsInfo = await getAllStudents();

  // console.log(getAllStudentsInfo);
  return (
    <ClientOnly>
      {/* <Container> */}
      <Heading title="Manage Users" />
      <ManageUserClient studentsInfo={getAllStudentsInfo} />
      {/* </Container> */}
    </ClientOnly>
  );
};

export default ManageUserPage;
