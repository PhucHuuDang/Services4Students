"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingServiceName from "@/app/components/listings/ListingServiceName";
import { getServicesInAPackage } from "@/app/types";

interface ListingsComboClientProps {
  data: getServicesInAPackage;
}

const ListingComboClient: React.FC<ListingsComboClientProps> = ({ data }) => {
  console.log(data.listServiceData.length);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-24">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={data.packageData.packageName}
            // imageSrc={data.packageData.image}
            imageSrc="/images/glamping.webp"
            id={data.packageData.id}
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              md:gap-12
              mt-6
          "
          >
            {/* <ListingInfo
              createdBy={listingServiceById.createBy}
              serviceDescription={listingServiceById.serviceDescription}
              price={listingServiceById.price}
            /> */}
            <div className="text-lg font-light">
              {data.packageData.packageDescription}
              {/* description in here, description in here, description in here,
              description in here, description in here, description in here,
              description in here, description in here, description in here,
              description in here, description in here, description in here,
              description in here, description in here, description in here,
              description in here, description in here, description in here,
              description in here, description in here, description in here{" "} */}
            </div>

            <div
              className={`
                flex
                flex-row
                sm:justify-center
                ${
                  data.listServiceData.length === 2
                    ? "md:justify-start"
                    : "md:justify-between"
                }
                flex-wrap
                order-first
                gap-3
                mb-10
                md:order-last
                
            `}
            >
              {data.listServiceData.map((item) => {
                return (
                  <ListingServiceName
                    key={item.id}
                    serviceName={item.serviceName}
                  />
                );
              })}

              {/* <ListingServiceName />
              <ListingServiceName />
              <ListingServiceName />
              <ListingServiceName />
              <ListingServiceName />
              <ListingServiceName /> */}
            </div>
          </div>
          <div
            className="
            flex
            flex-row
            items-center
            justify-center
          "
          >
            <div
              className="
                    
                    p-2
                    px-8
                    ml-36
                    rounded-md
                    cursor-pointer
                    bg-[#e87561]
                    hover:bg-[#ed6047]
                    shadow-md
                    transition

              "
            >
              Booking
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingComboClient;
