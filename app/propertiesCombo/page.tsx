import ClientOnly from "../components/ClientOnly";
import getPackages from "../components/actions/getPackages";
import getRoleUser from "../components/actions/getRoleUser";
import PropertiesClient from "./PropertiesComboClient";

const PropertiesPage = async () => {
  const packages = await getPackages();
  const getRole = await getRoleUser();

  return (
    <ClientOnly>
      <div className="p-20">
        <PropertiesClient getRole={getRole} packages={packages} />
      </div>
    </ClientOnly>
  );
};

export default PropertiesPage;
