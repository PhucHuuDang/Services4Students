"use client";

import { MdApartment } from "react-icons/md";

import { BookingByStuIdProps, PackageProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegionsType = {
  id: string;
  regionName: string;
};

interface ApartmentDetailProps {
  getDataBookingByStuId: BookingByStuIdProps[] | null;
  getInfo: any | null;
  regions: RegionsType[];
  packages: PackageProps[];
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({
  getDataBookingByStuId,
  getInfo,
  regions,
  packages,
}) => {
  //   console.log(packages);

  const router = useRouter();

  const [showDetails, setShowDetails] = useState(
    new Array(getDataBookingByStuId?.length).fill(false)
  );

  const [activePackage, setActivePackage] = useState("");

  const toggleDetail = (index: any) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  const handlePackageClick = (packageId: string) => {
    // setActivePackage(packageId); // Set the active package
    if (activePackage === packageId) {
      setActivePackage(""); // Reset the active package if clicked again
    } else {
      setActivePackage(packageId);
    }
  };
  return getDataBookingByStuId?.map((item, index) => {
    return (
      <div
        key={item.id}
        className="ml-10
              flex
              flex-col

              mt-5
              "
      >
        <div
          //   onClick={() => setShowDetail((value) => !value)}
          onClick={() => toggleDetail(index)}
          className="text-lg
              font-semibold
              text-neutral-700
              p-2.5
              rounded-md
              bg-neutral-200
              transition
              duration-200
              hover:bg-neutral-300
              hover:shadow-lg
              cursor-pointer
              flex
              flex-row
              items-center
              gap-2
          "
        >
          {/* Vinhomes Grand Park */}
          <MdApartment size={25} />
          {item.apartmentData.address}
        </div>
        <div
          className={`
              bg-white
              rounded-lg
              border-[1px]
              ${showDetails[index] ? "translate-y-0" : "translate-y-100"}
              ${showDetails[index] ? "opacity-100" : "opacity-0"}
              ${showDetails[index] ? "" : "hidden"}
              transition
              duration-300
     `}
        >
          {packages.map((packageId) =>
            item.details.map((value) => {
              //   const isActive = packageId.id === value.packageId;
              const isActive =
                packageId.id === value.packageId &&
                packageId.id === activePackage;
              return packageId.id === value.packageId ? (
                <div
                  key={packageId.id}
                  // onClick={() => router.push(value.id)}
                  //   onClick={() => console.log(value.id)}
                  onClick={() => {
                    handlePackageClick(packageId.id);
                    router.push(`/attendance/${value.id}`);
                  }}
                  className={`
                  
                  cursor-pointer
                  rounded-md
                  text-center
                  py-4
                  transition
                  duration-200
                  hover:text-[#ff6347]
                  hover:shadow-lg
                  focus:text-[#ff6347]
                  text-md
                  font-semibold 
                  ${isActive ? "text-[#ff6347]" : ""}
                  
                  `}
                >
                  {packageId.packageName}
                </div>
              ) : (
                ""
              );
            })
          )}
          {/* <div
            className="
                  cursor-pointer
                  rounded-md
                  text-center
                  py-4
                  transition
                  duration-200
                  hover:text-[#ff6347]
                  hover:shadow-lg
                  focus:text-[#ff6347]
                  text-md
                  font-semibold "
          >
            {packageId.packageName}
          </div> */}
        </div>
      </div>
    );
  });
};

export default ApartmentDetail;
