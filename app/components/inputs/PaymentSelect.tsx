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

interface PaymentSelectProps {
  paymentMethod: PaymentMethodProps[]; // Update the type of regions
  onChange?: (value: any) => void;
}

const PaymentSelect: React.FC<PaymentSelectProps> = ({
  paymentMethod,
  onChange,
}) => {
  const options = paymentMethod.map((item: PaymentMethodProps) => ({
    // value: item.id, // Use item.id as the value
    value: item.id,
    label: item.paymentMethodName,
    // label: item.regionName, // Use item.regionName as the label
  }));

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      onChange(selectionOptions.value);
    }
  };

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
        placeholder="Choose Payment method..."
        menuPlacement="top"
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

export default PaymentSelect;
