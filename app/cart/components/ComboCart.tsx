"use client";

import { PackageProps, PaymentMethodProps } from "@/app/types";

interface ComboCartProps {
  data?: PackageProps | undefined;
  getApartmentByStudentId: any | null;
  getStudentId: any | null;
  paymentMethods: PaymentMethodProps[];
}

const ComboCart: React.FC<ComboCartProps> = ({
  getApartmentByStudentId,
  getStudentId,
  paymentMethods,
}) => {
  return <div>Combo Carts</div>;
};

export default ComboCart;
