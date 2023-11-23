"use client";

import { FaRegEdit } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { GetCategory, ServiceProp } from "@/app/types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/inputs/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import useDeleteProperties from "../hooks/useDeleteProperties";
import DeleteModal from "../components/DeleteModal";
import UpdateServiceModal from "../components/modals/UpdateServiceModal";
import useUpdateServiceModal from "../hooks/useUpdateServiceModal";

interface PropertiesProps {
  data: any;
  getRole: any;
  category: GetCategory[];
}

const PropertiesClient: React.FC<PropertiesProps> = ({
  data,
  getRole,
  category,
}) => {
  const router = useRouter();
  const [deleteIdProperties, setDeleteIdProperties] = useState("");
  const [deleteServiceName, setDeleteServiceName] = useState("");
  const [deleteCreatedBy, setDeleteCreatedBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateServiceModal = useUpdateServiceModal();

  const [dataUpdate, setDataUpdate] = useState<ServiceProp | null>(null);

  const deleteProperties = useDeleteProperties();

  // console.log(data);

  const openModalDeleteProperties = useCallback(
    (id: string, serviceName: string, created: string) => {
      setDeleteIdProperties(id);
      setDeleteServiceName(serviceName);
      setDeleteCreatedBy(created);
      deleteProperties.onOpen();
    },
    [deleteProperties]
  );

  const closeModalDeleteProperties = useCallback(() => {
    setDeleteIdProperties("");
    setDeleteServiceName("");
    setDeleteCreatedBy("");

    deleteProperties.onClose();
  }, [deleteProperties]);

  const dataUpdateFunc = useCallback((category: ServiceProp) => {
    setDataUpdate(category);
  }, []);

  const onCancel = useCallback(() => {
    setIsLoading(true);

    // console.log("deleteId: ", deleteIdProperties);
    axios
      // .delete(`http://3.27.132.94/api/v1/services/services/${id}`)
      .delete("/api/service/serviceDeleted", { data: { deleteIdProperties } })
      .then(() => {
        toast.success("Delete service successfully");
        router.refresh();
        deleteProperties.onClose();
      })
      .catch(() => {
        toast.error("Failed to delete service");
      })
      .finally(() => {
        setDeleteServiceName("");
        setDeleteCreatedBy("");
        setIsLoading(false);
      });
  }, [router, deleteIdProperties, deleteProperties]);

  useEffect(() => {
    if (getRole && getRole.role !== "Admin") {
      router.push("/");
      // console.log(getRole);
    }
  }, [router, getRole]);

  if (getRole && getRole.role !== "Admin") {
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
    <Container>
      <div className="pt-10">
        <Heading title="Properties" subtitle="List of your properties" center />
      </div>
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
                // onAction={onCancel}
                serviceName={item.serviceName}
                createdBy={item.createBy}
                disabled={deleteIdProperties === item.id}
                actionLabel="Delete Service"
                dataUpdateServiceFunc={dataUpdateFunc}
                openModalDeleteProperties={openModalDeleteProperties}
                icon={FaRegEdit}
                service
              />
            )
          );
        })}
      </div>

      <DeleteModal
        isOpen={deleteProperties.isOpen}
        disabled={isLoading}
        onConfirmDelete={onCancel}
        onClose={closeModalDeleteProperties}
        properties
        deleteName={deleteServiceName}
        deleteCreatedBy={deleteCreatedBy}

        // onClose={}
      />

      <UpdateServiceModal getCategoryId={category} dataUpdate={dataUpdate} />
    </Container>
  );
};

export default PropertiesClient;
