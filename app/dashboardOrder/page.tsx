import ClientOnly from "../components/ClientOnly";
import getBookingMoneyByOneYear from "../components/actions/getBookingMoneyByOneYear";
import getRoleUser from "../components/actions/getRoleUser";
import DashboardOrderClient from "./DashboardOrderClient";

const DashboardOrderPage = async () => {
  const getRole = await getRoleUser();
  //   console.log(getRole);

  const totalPriceOneDay = await getBookingMoneyByOneYear(
    "11/1/2023",
    "11/2/2023"
  );
  //   console.log(totalPriceOneDay);
  const listBookingOneDay = totalPriceOneDay.bookings;
  return (
    <ClientOnly>
      <DashboardOrderClient
        getRole={getRole}
        listBookingOneDay={listBookingOneDay}
      />
    </ClientOnly>
  );
};

export default DashboardOrderPage;
