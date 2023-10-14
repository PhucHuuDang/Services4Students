"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { ServiceProp } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IoFastFoodOutline } from "react-icons/io5";

interface SearchItemProps {
  label: string;
  onClick: () => void;
  data: ServiceProp;
}

const SearchItem: React.FC<SearchItemProps> = ({ label, onClick, data }) => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const handleRouter = useCallback(() => {
    // await setTimeout(() => {
    //   searchModal.onClose();
    // }, 600);
    searchModal.onClose();

    router.push(`/listings/${data.id}`);
  }, [data, router, searchModal]);

  return (
    <div
      onClick={handleRouter}
      className="
            w-full
            md:w-4/5
            lg:w-5/5
            rounded-sm
            border-b-[2px]
            bg-white
            hover:bg-[#ebebeb]
            border-[#ebebeb]
            transition
            duration-300
            "
    >
      <div className="flex flex-row items-center ml-4 gap-4">
        <IoFastFoodOutline size={24} />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{data.serviceName}</div>
          <div className="text-sm text-neutral-500">Type</div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
