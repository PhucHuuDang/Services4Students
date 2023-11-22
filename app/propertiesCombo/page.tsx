import ClientOnly from "../components/ClientOnly";
import getPackages from "../components/actions/getPackages";
import getRoleUser from "../components/actions/getRoleUser";
import getServices from "../components/actions/getServices";
import PropertiesClient from "./PropertiesComboClient";

const PropertiesPage = async () => {
  const packages = await getPackages();
  const getRole = await getRoleUser();
  const services = await getServices();

  return (
    <ClientOnly>
      <div className="p-20">
        <PropertiesClient
          getRole={getRole}
          packages={packages}
          services={services}
        />
      </div>
    </ClientOnly>
  );
};

export default PropertiesPage;
