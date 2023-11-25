import Select from "react-select";

type ServicesFormSelectTypeProps = {
  value: string;
  label: string;
  type: number;
  remainingTaskDuration: number;
};

interface ServicesFormSelectProps {
  onChange?: (value: any) => void;
  options: any;
  title: string;
  setSelectTypeOfBookingDetail: (value: string) => void;
  setSelectRemainingTaskDuration: (value: number) => void;
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

const ServicesFormSelect: React.FC<ServicesFormSelectProps> = ({
  onChange,
  options,
  title,
  setSelectTypeOfBookingDetail,
  setSelectRemainingTaskDuration,
}) => {
  const MAX_LENGTH = 46;

  //   const flattenedOptions = options?.flat() || [];
  //   const mappedOptions = flattenedOptions.map(
  //     (item: ServicesFormSelectTypeProps) => ({
  //       value: item.value,
  //       label:
  //         item.label && item.label.length > MAX_LENGTH
  //           ? item.label.substring(0, MAX_LENGTH - 3) + "..."
  //           : item.label,
  //       type: item.type,
  //       remainingTaskDuration: item.remainingTaskDuration,
  //     })
  //   );

  const option =
    options?.map((item: ServicesFormSelectTypeProps) => ({
      value: item.value,
      label:
        item.label && item.label.length > MAX_LENGTH
          ? item.label.substring(0, MAX_LENGTH - 3) + "..."
          : item.label,
      type: item.type,
      remainingTaskDuration: item.remainingTaskDuration,
    })) || [];

  //   console.log(options);

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      onChange(selectionOptions.value);
      setSelectTypeOfBookingDetail(selectionOptions.type);
      setSelectRemainingTaskDuration(
        selectionOptions.remainingTaskDuration || 0
      );
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

export default ServicesFormSelect;
