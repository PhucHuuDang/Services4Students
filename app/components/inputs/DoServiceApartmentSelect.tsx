import { PaymentMethodProps } from "@/app/types";
import { useState } from "react";
import Select from "react-select";

// type PaymentMethodProps = {
//   id: string;
//   paymentMethodName: string;
//   createBy: string;
//   created: string;
//   lastModified: string;
//   lastModifiedBy: null;
//   isDelete: boolean;
// };

interface DoServiceApartmentSelectProps {
  getApartmentByStudentId: any | []; // Update the type of regions
  onChange?: (value: any) => void;
}

const DoServiceApartmentSelect: React.FC<DoServiceApartmentSelectProps> = ({
  getApartmentByStudentId,
  onChange,
}) => {
  const options = getApartmentByStudentId
    ? getApartmentByStudentId.map((item: any) => ({
        // value: item.id, // Use item.id as the value
        value: item.id,
        label: item.address,
        // label: item.regionName, // Use item.regionName as the label
      }))
    : null;

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      onChange(selectionOptions.value);
    }
  };

  // console.log(getApartmentByStudentId);

  //   const [takeValue, setTakeValue] = useState("");
  return (
    <div>
      <Select
        options={options}
        // onChange={(selectOptions: any) => onChange(selectOptions.value)}
        onChange={handleChangeValue}
        // formatOptionLabel={() => {}}

        classNames={{
          control: () => "p-1 border-[4px] z-10 w-[300px]",
          input: () => "text-lg z-10",
          option: () => "text-lg z-10",
        }}
        placeholder="Choose your apartment..."
        // formatOptionLabel={(option: any) => (
        //   <div className="flex flex-row items-center gap-3">
        //     <div>{option.id}</div>
        //   </div>
        // )}

        // styles={{
        //   container: (provided) => ({
        //     ...provided,
        //     position: "absolute",
        //     top: 0,
        //   }),
        // }}
      />
    </div>
  );
};

export default DoServiceApartmentSelect;
