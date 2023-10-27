"use client";

import { useRouter } from "next/navigation";

interface ListingServiceNameProps {
  serviceName: string;
  serviceId: string;
}

const ListingServiceName: React.FC<ListingServiceNameProps> = ({
  serviceName,
  serviceId,
}) => {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={() => router.push(`/listings/${serviceId}`)}
        className="
            rounded-lg 
            p-3
            cursor-pointer
            shadow-md
            bg-neutral-100
            hover:bg-neutral-200
            font-medium
            hover:shadow-xl
            hover:scale-105
            transition
            duration-200
        "
      >
        {/* {serviceName || "Service Name in here"} */}
        {serviceName}
      </div>
    </div>
  );
};

export default ListingServiceName;
