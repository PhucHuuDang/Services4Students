import ClientOnly from "../components/ClientOnly";
import Heading from "../components/Heading";
import getBookingDetail from "../components/actions/getBookingDetail";
import { DetailsProps } from "../types";
import AssignTaskClient from "./AssignTaskClient";

const AssignPage = async () => {
  const allBookingDetail = await getBookingDetail();

  return (
    <ClientOnly>
      <div className="pt-32">
        <Heading
          title="Assign Task"
          subtitle="The list package(combo) was booked by user, you can assign task for staff"
          center
        />
      </div>

      <div
        className="
                 p-20
                 grid
                 gird-cols-1
                 sm:grid-cols-2
                 md:grid-cols-3
                 lg:grid-cols-4
                 xl:grid-cols-5
                 2xl:grid-cols-6
                 gap-8
        
        "
      >
        {allBookingDetail.map((item: DetailsProps) => {
          return (
            <>
              <AssignTaskClient key={item.id} dataBookingDetail={item} />
            </>
          );
        })}
      </div>
    </ClientOnly>
  );
};

export default AssignPage;
