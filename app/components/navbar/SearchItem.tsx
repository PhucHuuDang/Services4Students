"use client";

interface SearchItemProps {
  label: string;
  onClick: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
            w-full
            md:w-4/5
            lg:w-5/5
            rounded-sm
            border-b-[2px]
            bg-white
            hover:bg-[#ebebeb]
            border-[#ebebeb]
            transition
            duration-300
            "
    >
      <div className="p-4">{label}</div>
    </div>
  );
};

export default SearchItem;
