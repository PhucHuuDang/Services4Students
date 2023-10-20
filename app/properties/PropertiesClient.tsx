"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { ServiceProp } from "@/app/types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/inputs/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PropertiesProps {
  data: any;
}

const PropertiesClient: React.FC<PropertiesProps> = ({ data }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: any) => {
      setDeleteId(id);

      console.log("deleteId: ", id);
      axios
        // .delete(`http://3.27.132.94/api/v1/services/services/${id}`)
        .delete("/api/service/serviceDeleted", { data: { id } })
        .then(() => {
          toast.success("Delete service successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to delete service");
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" center />
      <div
        className="
            pt-20
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
      
        "
      >
        {data.map((item: ServiceProp) => {
          const isDelete: boolean = item.isDelete;
          // console.log(item.isDelete);
          return (
            !isDelete && (
              <ListingCard
                key={item.id}
                data={item}
                actionId={item.id}
                onAction={onCancel}
                disabled={deleteId === item.id}
                actionLabel="Delete Service"
              />
            )
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
