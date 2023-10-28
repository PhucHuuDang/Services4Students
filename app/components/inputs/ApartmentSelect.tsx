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

const ApartmentSelect: React.FC<AuthorizeClientProps> = ({
  regions,
  onChange,
}) => {
  //   const regions = await getRegions();

  const options = regions.map((item: RegionsProps) => ({
    value: item.id, // Use item.id as the value
    label: item.regionName, // Use item.regionName as the label
  }));

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      onChange(selectionOptions.value);
    }
  };

  const [takeValue, setTakeValue] = useState("");
  return (
    <div>
      <Select
        options={options}
        // onChange={(selectOptions: any) => onChange(selectOptions.value)}
        onChange={handleChangeValue}
        // formatOptionLabel={() => {}}

        classNames={{
          control: () => "p-3 border-2 z-10",
          input: () => "text-lg z-10",
          option: () => "text-lg z-10",
        }}
        placeholder="Choose your location..."
      />
    </div>
  );
};

export default ApartmentSelect;
