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

// {
//     bookingDetail: {
//       totalPriceOfQuantity: 0,
//       isRe_Newed: false,
//       renewStartDate: null,
//       remainingTaskDuration: 1,
//       quantityOfPackageOrdered: 0,
//       bookingDetailStatus: 0,
//       bookingId: '528849b3-ff36-4a4a-9f88-eb601f188b7a',
//       packageId: 'c0e52326-c1c2-4c58-a5d9-d6a768e0c7a9',
//       booking: null,
//       package: null,
//       attendReport: [
//         {
//           dateDoPackage: '2023-11-06T00:00:00',
//           bookingDetailId: '119fff90-f476-4339-b07e-0b8566ae8636',
//           reportWorkId: null,
//           attendenceStatus: 0,
//           bookingDetail: null,
//           feedBack: {
//             feedBackName: null,
//             feedBackDescription: null,
//             feedBackImage: null,
//             feedBackRating: null,
//             feedBackStatus: 0,
//             studentId: '5f83e03f-50ff-45fe-a4e4-11a0e1fafc58',
//             attendReportId: '842da3ab-0f29-4a36-bed2-dc8d3f2d4e88',
//             students: null,
//             attendReports: null,
//             created: '2023-11-02T08:37:16.6530877',
//             createBy: null,
//             lastModified: '2023-11-02T08:37:16.6530877',
//             lastModifiedBy: null,
//             isDelete: false,
//             id: 'c3078568-6b7e-42e1-9743-3db84786809b',
//             domainEvents: []
//           },
//           created: '2023-11-02T08:37:16.6392537',
//           createBy: null,
//           lastModified: '2023-11-02T08:37:16.6392535',
//           lastModifiedBy: null,
//           isDelete: false,
//           id: '842da3ab-0f29-4a36-bed2-dc8d3f2d4e88',
//           domainEvents: []
//         }
//       ],
//       bookingDetailStaff: null,
//       created: '2023-11-02T08:37:16.6392541',
//       createBy: 'testuser044',
//       lastModified: '2023-11-02T08:37:16.639254',
//       lastModifiedBy: null,
//       isDelete: false,
//       id: '119fff90-f476-4339-b07e-0b8566ae8636',
//       domainEvents: []
//     },
//     attendReports: [
//       {
//         id: '842da3ab-0f29-4a36-bed2-dc8d3f2d4e88',
//         dateDoPackage: '2023-11-06T00:00:00',
//         bookingDetailId: '119fff90-f476-4339-b07e-0b8566ae8636',
//         reportWorkId: '00000000-0000-0000-0000-000000000000',
//         attendenceStatus: 0,
//         created: '2023-11-02T08:37:16.6392537',
//         isDeleted: false,
//         feedbackAvailable: 'Can not feedback'
//       }
//     ]
//   }
