"use client";

import { useState } from "react";
import Select from "react-select";

type RegionsProps = {
  id: string;
  regionName: string;
};

interface AuthorizeClientProps {
  regions: RegionsProps[]; // Update the type of regions
  onChange?: (value: any) => void;
}

const AuthorizeClient: React.FC<AuthorizeClientProps> = ({ regions }) => {
  // const [takeValue, setTakeValue] = useState<any>();
  // // Create an array of options from the regions prop
  // const options = regions.map((item: RegionsProps) => ({
  //   value: item.id, // Use item.id as the value
  //   label: item.regionName, // Use item.regionName as the label
  // }));

  // //   console.log(options);

  // //   if (!takeValue || takeValue === undefined) {
  // //     return;
  // //   }

  // console.log(takeValue);
  // console.log(takeValue ? takeValue.value : null);

  // return (
  //   <div className="p-24">
  //     <Select
  //       options={options}
  //       onChange={(selectOptions: any) => setTakeValue(selectOptions.value)}
  //       // formatOptionLabel={() => {}}

  //       classNames={{
  //         control: () => "p-3 border-2",
  //         input: () => "text-lg",
  //         option: () => "text-lg",
  //       }}
  //       placeholder="Choose your location..."
  //     />
  //   </div>
  // );
  return <div>handleChangeValue</div>;
};

export default AuthorizeClient;
