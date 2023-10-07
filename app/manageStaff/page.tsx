import ClientOnly from "../components/ClientOnly";
import Heading from "../components/Heading";
import getAllStaffs from "../components/actions/getAllStaffs";
import ManageStaffClient from "./ManageStaffClient";

const ManageStaffPage = async () => {
  const getAllStaffInfo = await getAllStaffs();

  //   console.log(getAllStaffInfo);

  return (
    <ClientOnly>
      {/* <Heading title="Manage Staffs" /> */}
      <div className="pt-10">
        <ManageStaffClient staffsInfo={getAllStaffInfo} />
      </div>
    </ClientOnly>
  );
};

export default ManageStaffPage;
