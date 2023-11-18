"use client";

import Image from "next/image";
import Button from "../Button";
import { PackageProps, ServiceProp } from "@/app/types";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

interface ListingCardProps {
  onAction?: (id: string) => void;
  serviceId?: string;
  categoryId?: string;
  actionLabel?: string;
  disabled?: boolean;
  data?: ServiceProp | undefined;
  packageData?: PackageProps;
  actionId?: string;
  combo?: boolean;
  openModalDeleteProperties?: (
    id: string,
    serviceName: string,
    createdBy: string
  ) => void;
  serviceName?: string;
  createdBy?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  onAction,
  actionLabel,
  disabled,
  serviceId,
  categoryId,
  combo,
  actionId = "",
  data,
  packageData,
  createdBy = "",
  serviceName = "",
  openModalDeleteProperties,
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

  // console.log(data);

  const MAX_LENGTH = 94;

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

  const handleOpenDeleteProperties = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      openModalDeleteProperties?.(actionId, serviceName, createdBy);
    },
    [openModalDeleteProperties, actionId, disabled, serviceName, createdBy]
  );

  const formatDays = (days: string[]) => {
    return days
      .map((day, index) => {
        if (index < days.length - 1) {
          return day + " ";
        }
        return day;
      })
      .join(", ");
  };

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
            src={packageData ? packageData.image : (data?.image as any)}
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
          <div className="font-semibold text-lg min-h-[56px]">
            {packageData?.packageName}
          </div>
        ) : (
          <div className="font-semibold text-lg">{data?.serviceName}</div>
        )}

        {packageData ? (
          <div className="flex flex-col min-h-[100px]">
            <div className="font-semibold text-neutral-600">
              Weeks:{" "}
              <span className="text-[#ff6347]">
                {packageData.weekNumberBooking}
              </span>
            </div>

            <div className="font-semibold text-neutral-600">
              Day work per week:{" "}
              <span className="text-[#ff6347]">
                {packageData.numberOfPerWeekDoPackage}
              </span>
            </div>

            <div className="font-semibold text-neutral-600 min-h-[40px]">
              Days work:{" "}
              <span className="text-[#ff6347]">
                {formatDays(packageData.dayDoInWeek)}
              </span>
            </div>
          </div>
        ) : (
          <div className="font-light text-neutral-500 h-[96px]">
            {data?.serviceDescription &&
            data.serviceDescription.length > MAX_LENGTH
              ? data.serviceDescription.slice(0, MAX_LENGTH) + "..."
              : data?.serviceDescription}
          </div>
        )}

        {packageData ? (
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold text-[#ff6347]">
              {packageData.totalPrice} $
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold text-[#ff6347] flex items-center">
              {data?.price} $
            </div>
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
        {openModalDeleteProperties && actionLabel && (
          <Button
            label={actionLabel}
            disabled={disabled}
            small
            onClick={handleOpenDeleteProperties}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ListingCard);
