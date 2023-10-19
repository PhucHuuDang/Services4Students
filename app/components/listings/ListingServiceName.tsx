"use client";

interface ListingServiceNameProps {
  serviceName?: string;
}

const ListingServiceName: React.FC<ListingServiceNameProps> = ({
  serviceName,
}) => {
  return (
    <div
      className="
            
        "
    >
      <div
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
