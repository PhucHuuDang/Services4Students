import ClientOnly from "../components/ClientOnly";
import getRegions from "../components/actions/getRegions";
import ApartmentModal from "../components/modals/ApartmentModal";
import CartClient from "./CartClient";

const CartPage = async () => {
  const regions = await getRegions();

  return (
    <ClientOnly>
      <div className="p-24 flex flex-col gap-5">
        <CartClient />
        <ApartmentModal regions={regions} />
      </div>
    </ClientOnly>
  );
};

export default CartPage;
