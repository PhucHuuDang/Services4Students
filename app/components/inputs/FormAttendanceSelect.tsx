import Select from "react-select";

type FormAttendanceSelectTypeProps = {
  value: string;
  label: string;
};

interface FormAttendanceSelectProps {
  onChange?: (value: any) => void;
  options: any;
  title: string;
}

// const options = [
//   { value: "Monday", label: "Monday" },
//   { value: "TuesDay", label: "TuesDay" },
//   { value: "Wednesday", label: "Wednesday" },
//   { value: "Thursday", label: "Thursday" },
//   { value: "Friday", label: "Friday" },
//   { value: "Saturday", label: "Saturday" },
//   { value: "Sunday", label: "Sunday" },
// ];

const FormAttendanceSelect: React.FC<FormAttendanceSelectProps> = ({
  onChange,
  options,
  title,
}) => {
  const option = options.map((item: FormAttendanceSelectTypeProps) => ({
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
          control: () => "p-1 border-[4px] w-[300px]",
          input: () => "text-lg z-50",
          option: () => "text-lg z-50",
        }}
        placeholder={title}
      />
    </div>
  );
};

export default FormAttendanceSelect;
