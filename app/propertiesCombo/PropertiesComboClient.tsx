"use client";

import { useRouter } from "next/navigation";
import { PackageProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import useDeleteComboConfirm from "../hooks/useDeleteComboConfirm";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/inputs/ListingCard";
import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PropertiesComboClientProps {
  getRole: any | null;
  packages: PackageProps[];
}

const PropertiesComboClient: React.FC<PropertiesComboClientProps> = ({
  getRole,
  packages,
}) => {
  const router = useRouter();
  const deleteComboConfirm = useDeleteComboConfirm();
  const [deleteIdProperties, setDeleteIdProperties] = useState("");
  const [deleteServiceName, setDeleteServiceName] = useState("");
  const [deleteCreatedBy, setDeleteCreatedBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModalDeleteProperties = useCallback(
    (id: string, serviceName: string, created: string) => {
      setDeleteIdProperties(id);
      setDeleteServiceName(serviceName);
      setDeleteCreatedBy(created);
      deleteComboConfirm.onOpen();
    },
    [deleteComboConfirm]
  );

  const closeModalDeleteProperties = useCallback(() => {
    setDeleteIdProperties("");
    setDeleteServiceName("");
    setDeleteCreatedBy("");

    deleteComboConfirm.onClose();
  }, [deleteComboConfirm]);

  const onCancel = useCallback(() => {
    setIsLoading(true);

    axios
      // .delete(`http://3.27.132.94/api/v1/services/services/${id}`)
      .delete("/api/combo/comboDeleted", { data: { deleteIdProperties } })
      .then(() => {
        toast.success("Delete Combo successfully");
        router.refresh();
        deleteComboConfirm.onClose();
      })
      .catch(() => {
        toast.error("Failed to delete service");
      })
      .finally(() => {
        setDeleteServiceName("");
        setDeleteCreatedBy("");
        setIsLoading(false);
      });
  }, [router, deleteIdProperties, deleteComboConfirm]);

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
        <Heading
          title="Manage Properties Combo"
          subtitle="List of your packages(combos) "
          center
        />
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
        {packages.map((item) => {
          return (
            !item.isDelete && (
              <ListingCard
                key={item.id}
                packageData={item}
                serviceName={item.packageName}
                createdBy={item?.createBy as any}
                actionId={item.id}
                disabled={deleteIdProperties === item.id}
                actionLabel="Delete Package(combo)"
                openModalDeleteProperties={openModalDeleteProperties}
                combo
              />
            )
          );
        })}
      </div>
      <DeleteModal
        isOpen={deleteComboConfirm.isOpen}
        disabled={isLoading}
        onConfirmDelete={onCancel}
        onClose={closeModalDeleteProperties}
        properties
        deleteName={deleteServiceName}
        deleteCreatedBy={deleteCreatedBy}
        combo

        // onClose={}
      />
    </Container>
  );
};

export default PropertiesComboClient;
