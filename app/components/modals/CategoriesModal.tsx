"use client";

import { GetCategory } from "@/app/types";
import CategoryInput from "../inputs/CategoryInput";
import useManageCategoriesModal from "@/app/hooks/useManageCategoriesModal";
import Modal from "./Modal";
import { CiCircleRemove } from "react-icons/ci";
import DeleteModal from "../DeleteModal";
import { useCallback, useState } from "react";
import useDeleteCategory from "@/app/hooks/useDeleteCategory";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CategoriesModalProps {
  categories: GetCategory[];
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ categories }) => {
  const manageCategories = useManageCategoriesModal();
  const deleteCategory = useDeleteCategory();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const openDeleteUserModal = useCallback(
    (id: string, serviceName: string) => {
      setDeleteId(id);
      setDeleteName(serviceName);

      deleteCategory.onOpen();
    },
    [deleteCategory]
  );

  const closeDeleteModal = useCallback(() => {
    setDeleteId("");
    setDeleteName("");
    deleteCategory.onClose();
  }, [deleteCategory]);

  const onCancel = useCallback(() => {
    setDisabled(true);
    axios
      .delete("/api/category/delete", { data: { deleteId } })
      .then(() => {
        toast.success("Delete staff successfully");
        closeDeleteModal();
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to delete staff");
      })
      .finally(() => {
        // setDeleteId("");
        setDisabled(false);
        setDeleteName("");
      });
  }, [closeDeleteModal, deleteId, router]);

  const bodyContent = (
    <>
      <div
        className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-auto
            mt-4
            relative
        
        "
      >
        {categories.map((item) => {
          return (
            !item.isDelete && (
              <div key={item.id} className="col-span-1 p-2">
                <CategoryInput
                  onClick={() => {}}
                  manageCategories
                  openDeleteUserModal={openDeleteUserModal}
                  // onClick={() => setCustomValue(item.id)}
                  id={item.id}
                  icon={CiCircleRemove}
                  // selected={listCategoryId}
                  //   selected={listCategoryId.includes(item.id)}
                  selected={false}
                  label={item.categoryName}
                />
              </div>
            )
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <Modal
        title="Manage categories"
        body={bodyContent}
        isOpen={manageCategories.isOpen}
        onClose={manageCategories.onClose}
        onSubmit={() => {}}
        actionLabel="Done"
      />
      <DeleteModal
        disabled={disabled}
        isOpen={deleteCategory.isOpen}
        deleteName={deleteName}
        onConfirmDelete={onCancel}
        onClose={closeDeleteModal}
        category
      />
    </>
  );
};

export default CategoriesModal;
