import ClientOnly from "../components/ClientOnly";
import getApartmentByStuId from "../components/actions/getApartmentByStuId";
import getPaymentMethod from "../components/actions/getPaymentMethod";
import getRegions from "../components/actions/getRegions";
import getRoleUser from "../components/actions/getRoleUser";
import ApartmentModal from "../components/modals/ApartmentModal";
import CartClient from "./CartClient";
import MainCart from "./MainCart";
import ServicesCart from "./components/ServicesCart";

const CartPage = async () => {
  const regions = await getRegions();
  const getStudentId: any = await getRoleUser();
  // const paymentMethods = await getPaymentMethod();

  //   console.log("getStudentId: ", getStudentId);

  //   if (!getStudentId && typeof window !== undefined) {
  //     localStorage.removeItem("cart");
  //   }

  const studentId = getStudentId ? getStudentId.userIdInTableDb : null;

  //   console.log("studentId: ", studentId);

  const getApartmentByStudentId = await getApartmentByStuId(studentId);

  //   console.log(getApartmentByStudentId);

  return (
    <ClientOnly>
      <div className="p-24 flex flex-col gap-5">
        {/* <CartClient
          getApartmentByStudentId={getApartmentByStudentId}
          getStudentId={getStudentId}
          // paymentMethods={paymentMethods}
        />
        <ServicesCart
          getApartmentByStudentId={getApartmentByStudentId}
          getStudentId={getStudentId}
        />
        <ApartmentModal getStudentId={getStudentId} regions={regions} /> */}
        <MainCart
          regions={regions}
          getStudentId={getStudentId}
          getApartmentByStudentId={getApartmentByStudentId}
        />
      </div>
    </ClientOnly>
  );
};

export default CartPage;
