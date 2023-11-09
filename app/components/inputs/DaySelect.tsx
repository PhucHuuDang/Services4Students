import Select from "react-select";

type DaySelectTypeProps = {
  value: string;
  label: string;
};

interface DaySelectProps {
  onChange?: (value: any) => void;
}

const options = [
  { value: "Monday", label: "Monday" },
  { value: "TuesDay", label: "TuesDay" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const DaySelect: React.FC<DaySelectProps> = ({ onChange }) => {
  const option = options.map((item: DaySelectTypeProps) => ({
    value: item.value, // Use item.id as the value
    label: item.label, // Use item.regionName as the label
  }));

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      onChange(selectionOptions.value);
    }
  };

  return (
    <div>
      <Select
        options={option}
        // onChange={(selectOptions: any) => onChange(selectOptions.value)}
        onChange={handleChangeValue}
        // formatOptionLabel={() => {}}

        classNames={{
          control: () => "p-3 border-2 z-30",
          input: () => "text-lg z-50",
          option: () => "text-lg z-50",
        }}
        placeholder="Choose current day you are feedback..."
      />
    </div>
  );
};

export default DaySelect;
