import { useCallback, useMemo, useState } from "react";
import Select from "react-select";

type TimeSelectTypeProps = {
  value: Date;
  label: string;
  number: number;
};

interface TimeSelectProps {
  onChange?: (value: any) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ onChange }) => {
  //   const formattedDate = new Date();
  //   const formattedDate = useMemo(() => {
  //     const date = new Date();
  //     return date;
  //   }, []); // Assuming this is your start date

  //   const endDate = useMemo(() => new Date(formattedDate), [formattedDate]);

  //   const formatEndDate = useCallback(
  //     (value: any, daysAmount: number) => {
  //       endDate.setDate(value.getDate() + daysAmount);
  //       const endYear = endDate.getFullYear();
  //       const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
  //       const endDay = String(endDate.getDate()).padStart(2, "0");
  //       const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
  //       console.log(formattedEndDate);
  //       return formattedEndDate;
  //     },
  //     [endDate]
  //   );

  const formattedDate = useMemo(() => new Date(), []);

  // State to manage the end date
  const [endDate, setEndDate] = useState(new Date(formattedDate));

  const formatEndDate = useCallback((value: any, daysAmount: number) => {
    const newEndDate = new Date(value);
    newEndDate.setDate(newEndDate.getDate() + daysAmount);
    const endYear = newEndDate.getFullYear();
    const endMonth = String(newEndDate.getMonth() + 1).padStart(2, "0");
    const endDay = String(newEndDate.getDate()).padStart(2, "0");
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
    console.log(formattedEndDate);

    // Update the end date in the state
    setEndDate(newEndDate);

    return formattedEndDate;
  }, []);

  const options = [
    { value: formattedDate, label: "7 days", number: 7 },
    { value: formattedDate, label: "2 weeks", number: 14 },
    { value: formattedDate, label: "1 month", number: 30 },
    { value: formattedDate, label: "3 months", number: 90 },
    { value: formattedDate, label: "6 months", number: 180 },
  ];
  const option = options.map((item: TimeSelectTypeProps) => ({
    value: item.value, // Use item.id as the value
    label: item.label, // Use item.regionName as the label
    number: item.number,
  }));

  const handleChangeValue = (selectionOptions: any) => {
    if (onChange) {
      console.log(selectionOptions.label);
      if (
        selectionOptions.label === selectionOptions.label ||
        selectionOptions.label === selectionOptions.label ||
        selectionOptions.label === selectionOptions.label ||
        selectionOptions.label === selectionOptions.label ||
        selectionOptions.label === selectionOptions.label
      ) {
        console.log(selectionOptions.number);
        // const test = endDate.setDate(selectionOptions.value.getDate() + 7);
        // const endYear = endDate.getFullYear();
        // const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
        // const endDay = String(endDate.getDate()).padStart(2, "0");
        // const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
        // console.log(formattedEndDate);
        const formattedEndDate = formatEndDate(
          selectionOptions.value,
          selectionOptions.number
        );

        console.log(formattedEndDate);

        return onChange(formattedEndDate);
      }
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
          control: () => "p-1 border-[4px] z-50 w-[300px]",
          input: () => "text-lg z-10",
          option: () => "text-lg z-10",
        }}
        placeholder="Choose day you want to do..."
        menuPlacement="top"
      />
    </div>
  );
};

export default TimeSelect;
