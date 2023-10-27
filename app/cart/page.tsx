import ClientOnly from "../components/ClientOnly";
import CartClient from "./CartClient";

const CartPage = () => {
  return (
    <ClientOnly>
      <div className="p-24 flex flex-col gap-5">
        <CartClient />
      </div>
    </ClientOnly>
  );
};

export default CartPage;
