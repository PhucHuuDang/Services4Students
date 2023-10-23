import ClientOnly from "../components/ClientOnly";
import getRoleUser from "../components/actions/getRoleUser";
import getServices from "../components/actions/getServices";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const getListServices = await getServices();
  const getRole = await getRoleUser();

  // if (getListServices.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No properties found"
  //         subtitle="Look like you have any property"
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      <div
        className="
        p-20
      
      "
      >
        <PropertiesClient data={getListServices} getRole={getRole} />
      </div>
    </ClientOnly>
  );
};

export default PropertiesPage;
