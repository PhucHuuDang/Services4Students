"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import ClientOnly from "../components/ClientOnly";
import Heading from "../components/Heading";
import AssignTaskListing from "../components/listings/AssignTaskListing";
import AssignModal from "../components/modals/AssignModal";
import { DetailsProps } from "../types";
import useAssignModal from "../hooks/useAssignModal";
import EmptyState from "../components/EmptyState";
import { useRouter } from "next/navigation";

interface AssignTaskClientProps {
  dataBookingDetail: DetailsProps[];
  dataStaffs: any;
  getRole: any | null;
}

const AssignTaskClient: React.FC<AssignTaskClientProps> = ({
  dataBookingDetail,
  dataStaffs,
  getRole,
}) => {
  const [serviceId, setServiceId] = useState("");
  const [bookingDetailId, setBookingDetailId] = useState("");
  const [bookingDetailType, setBookingDetailType] = useState("");
  const [bookingDetailTitle, setBookingDetailTitle] = useState("");

  const assignModal = useAssignModal();
  const router = useRouter();

  const openAssignModal = useCallback(
    (id: string, serviceId: string, type: string, title: string) => {
      setBookingDetailId(id);
      setServiceId(serviceId);
      setBookingDetailType(type);
      setBookingDetailTitle(title);
      assignModal.onOpen();
    },
    [assignModal]
  );

  // console.log("bookingDetailId: ", bookingDetailId);

  useEffect(() => {
    if (getRole && getRole.role !== "Admin") {
      router.push("/");
      // console.log(getRole);
    }
  }, [router, getRole]);

  if (getRole && getRole.role !== "Admin") {
    // console.log("first");
    return (
      <ClientOnly>
        <EmptyState
          title="You are not authorized to access"
          subtitle="Redirect to your page"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
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
        {dataBookingDetail.map((item: DetailsProps, index: number) => {
          return (
            <AssignTaskListing
              // dataStaffs={dataStaffs}
              key={`${item.bookingDetailId}_${index}`}
              dataBookingDetail={item}
              openAssignModal={openAssignModal}
            />
          );
        })}
      </div>
      <AssignModal
        dataStaffs={dataStaffs}
        bookingDetailId={bookingDetailId}
        serviceId={serviceId}
        bookingDetailType={bookingDetailType}
        bookingDetailTitle={bookingDetailTitle}
      />
      {/* <AssignTaskListing /> */}
    </ClientOnly>
  );
};

export default AssignTaskClient;
