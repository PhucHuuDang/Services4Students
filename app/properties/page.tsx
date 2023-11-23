import ClientOnly from "../components/ClientOnly";
import getCategories from "../components/actions/getCategories";
import getRoleUser from "../components/actions/getRoleUser";
import getServices from "../components/actions/getServices";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const getListServices = await getServices();
  const getRole = await getRoleUser();
  const category = await getCategories();

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
        <PropertiesClient
          data={getListServices}
          category={category}
          getRole={getRole}
        />
      </div>
    </ClientOnly>
  );
};

export default PropertiesPage;
