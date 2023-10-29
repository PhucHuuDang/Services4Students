"use client";

import Image from "next/image";
import Button from "../Button";
import { PackageProps, ServiceProp } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
interface ListingCardProps {
  onAction?: (id: string) => void;
  serviceId?: string;
  categoryId?: string;
  actionLabel?: string;
  disabled?: boolean;
  data?: ServiceProp | undefined;
  packageData?: PackageProps;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  onAction,
  actionLabel,
  disabled,
  serviceId,
  categoryId,
  actionId = "",
  data,
  packageData,
}) => {
  const router = useRouter();

  const routerListing = useCallback(() => {
    packageData
      ? router.push(`/listingsCombo/${packageData.id}`)
      : // console.log(packageData.id)
        // router.push(`/listingsCombo`)
        router.push(`/listings/${data?.id}`);
  }, [router, packageData, data]);

  // console.log(data?.isDelete);

  // console.log(packageData);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  return (
    <div
      // onClick={() => console.log(data.id)}
      // onClick={() => router.push(`/listings/${data.id}`)}
      onClick={routerListing}
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
            // src={data.image || "/images/glamping.webp"}
            // src={"/images/glamping.webp"}
            src={packageData ? packageData.image : (data?.image as any)}
            // src={
            //   "https://res.cloudinary.com/dqqqgyqjl/image/upload/v1697074879/ptgwqf7gyglk9goenock.webp"
            // }
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

        {packageData ? (
          <div className="font-semibold text-lg">
            {packageData?.packageName}
          </div>
        ) : (
          <div className="font-semibold text-lg">{data?.serviceName}</div>
        )}

        {packageData ? (
          <div className="font-light text-neutral-500">
            {packageData.packageDescription}
          </div>
        ) : (
          <div className="font-light text-neutral-500">
            {data?.serviceDescription}
          </div>
        )}

        {packageData ? (
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{packageData.totalPrice} vnd</div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{data?.price} vnd</div>
          </div>
        )}

        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            disabled={disabled}
            small
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
