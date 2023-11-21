import { ServiceProp } from "./types";

import getServices from "./components/actions/getServices";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/inputs/ListingCard";
import Banner from "./components/navbar/Banner";
import MainPageClient from "./components/MainPageClient";

export default async function Home() {
  const services = await getServices();

  return (
    <ClientOnly>
      {/* <div
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
              const isDeleted = service.isDelete;
              return (
                !isDeleted && (
                  <ListingCard
                    key={service.id}
                    serviceId={service.id}
                    categoryId={service.categoryId}
                    data={service}
                    comboBooking
                    actionLabel="Booking"
                  />
                )
              );
            })}
          </div>
        </Container>
      </div> */}
      <MainPageClient services={services} />
    </ClientOnly>
  );
}
