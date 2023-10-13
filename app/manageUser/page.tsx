import getAllStudents from "../components/actions/getAllStudents";
import getServiceById from "../components/actions/getServiceById";

import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ManageUserClient from "./ManageUserClient";

const ManageUserPage = async () => {
  const getAllStudentsInfo = await getAllStudents();

  // console.log(getAllStudentsInfo);
  return (
    <ClientOnly>
      {/* <Heading title="Manage Users" /> */}
      <div className="pt-10">
        <ManageUserClient studentsInfo={getAllStudentsInfo} />
      </div>
    </ClientOnly>
  );
};

export default ManageUserPage;
