"use client";

import { useState } from "react";
import ClientOnly from "../components/ClientOnly";
import ApartmentModal from "../components/modals/ApartmentModal";
import CartClient from "./CartClient";
import ServicesCart from "./components/ServicesCart";
import { PackageProps, ServiceProp } from "../types";
import EmptyState from "../components/EmptyState";

export type ServiceArrayProps = {
  serviceId: string;
  quantityOfServiceOrdered: number;
};

interface MainCartProps {
  regions: any;
  getStudentId: any;
  getApartmentByStudentId: any;
}

const MainCart: React.FC<MainCartProps> = ({
  regions,
  getStudentId,
  getApartmentByStudentId,
}) => {
  const [priceServices, setPriceServices] = useState(0);
  const [serviceArray, setServiceArray] = useState<ServiceArrayProps[]>([]);

//   const [checkLengthDataCombo, setCheckLengthDataCombo] = useState<
//     PackageProps[]
//   >([]);
  const [checkLengthService, setCheckLengthService] = useState<ServiceProp[]>(
    []
  );

//   console.log(checkLengthDataCombo.length);

  //   if (checkLengthDataCombo.length === 0 && checkLengthService.length === 0) {
  //     return (
  //       <ClientOnly>
  //         <EmptyState
  //           title="Your cart is empty"
  //           subtitle="Let turn back and add some product you want our serve"
  //           showReset
  //           booking
  //         />
  //       </ClientOnly>
  //     );
  //   }
  //   console.log(serviceArray);
  //   console.log(priceServices);

  return (
    <ClientOnly>
      <CartClient
        getApartmentByStudentId={getApartmentByStudentId}
        getStudentId={getStudentId}
        priceServices={priceServices}
        serviceArray={serviceArray}
        // setCheckLengthDataCombo={setCheckLengthDataCombo}
        checkLengthService={checkLengthService}

        // paymentMethods={paymentMethods}
      />
      <ServicesCart
        getApartmentByStudentId={getApartmentByStudentId}
        getStudentId={getStudentId}
        setPriceServices={setPriceServices}
        setServiceArray={setServiceArray}
        setCheckLengthService={setCheckLengthService}
      />
      <ApartmentModal getStudentId={getStudentId} regions={regions} />
    </ClientOnly>
  );
};

export default MainCart;
