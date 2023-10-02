"use client";

import Image from "next/image";

interface ListingCardProps {}

const ListingCard: React.FC<ListingCardProps> = () => {
  return (
    <div
      onClick={() => {}}
      className="
          col-span-1 
          cursor-pointer 
          group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                aspect-square 
                w-full 
                relative 
                overflow-hidden 
                rounded-xl"
        >
          <Image
            fill
            alt="Listing"
            src="/images/glamping.webp"
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
          "
          />

          {/* can add here the icon cart or not */}
        </div>
        {/* name of services */}
        <div className="font-semibold text-lg">
          Delivery food and water bottle
        </div>

        <div className="font-light text-neutral-500">
          We provide this service with aim at to serve for you, your satisfy,
          our mission
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">500 vnd</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
