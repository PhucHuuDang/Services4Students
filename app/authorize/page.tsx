import getRegions from "../components/actions/getRegions";

import Select from "react-select";
import AuthorizeClient from "./AuthorizeClient";

const AuthorizePage = async () => {
  const regions = await getRegions();

  // console.log(regions);
  return (
    <div className="p-24">
      <AuthorizeClient regions={regions} />
    </div>
  );

  // if(addin !== 'Admin')
};

export default AuthorizePage;
