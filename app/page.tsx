import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/inputs/ListingCard";
import Banner from "./components/navbar/Banner";
import { usePathname } from "next/navigation";
import getServices from "./components/actions/getServices";
import Maps from "./components/navbar/Maps";

type ServiceProp = {
  id: string;
  serviceName: string;
  serviceDescription: string;
  price: number;
  image: string;
  categoryId: string;
  created: string;
  createBy: string;
  lastModified: string;
  lastModifiedBy: null;
  isDelete: boolean;
};

// "id": "55acbfcc-867d-49b8-9395-e4d1c5cd0abe",
//     "serviceName": "Rửa xe máy",
//     "serviceDescription": "Đặt niềm tin vào chúng tôi để có chiếc xe máy đẹp như mới",
//     "price": 20,
//     "image": "notyet",
//     "categoryId": "8abb3dda-208b-4397-93c0-3a5269a90e3d",
//     "created": "2023-10-10T18:48:44.8201809",
//     "createBy": "Hữu Phúc",
//     "lastModified": "2023-10-10T18:48:44.8201793",
//     "lastModifiedBy": null,
//     "isDelete": false

export default async function Home() {
  const services = await getServices();

  return (
    <ClientOnly>
      <div
        className="
        z-0
        w-full
        h-auto
    "
      >
        <div className="">
          <Banner />
        </div>
        <Container>
          {/* <div
            className="
            absolute 
            block 
            bottom-0 
            left-0 
            right-0 
            bg-white 
            max-h-0
            "
          > */}
          <div
            className="
                p-10
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
            {services.map((service: ServiceProp) => {
              return (
                <ListingCard
                  key={service.id}
                  serviceId={service.id}
                  categoryId={service.categoryId}
                  data={service}
                />
              );
            })}
          </div>
          {/* </div> */}
        </Container>
        {/* <div className="relative flex flex-col h-100%">
          <div
            className="
              absolute 
              left-0 
              top-0
              h-100%
              
              "
          >
            <Maps />
          </div>
        </div> */}
      </div>
    </ClientOnly>
  );
}
