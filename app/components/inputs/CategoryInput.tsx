"use client";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  id: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  id,
}) => {
  return (
    <div
      //   onClick={() => console.log(id)}
      onClick={() => onClick(id)}
      className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
      
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
