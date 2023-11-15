"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import Image from "next/image";
import { ReviewFeedbackProps } from "@/app/types";
import ClientOnly from "../ClientOnly";
import EmptyState from "../EmptyState";
import { Rate } from "antd";

interface ReviewFeedbackModalProps {
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  user?: boolean;
  reviewFeedback?: ReviewFeedbackProps[];
}

const ReviewFeedbackModal: React.FC<ReviewFeedbackModalProps> = ({
  isOpen,
  disabled,
  onClose,
  onConfirmDelete,
  reviewFeedback,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // const handleClose = useCallback(() => {
  //   if (disabled) {
  //     return;
  //   }

  //   setShowModal(false);

  //   setTimeout(() => {
  //     onClose();
  //   }, 300);
  // }, [disabled, onClose]);

  // const handleAgree = useCallback(() => {
  //   setDeleteStaff(true);
  //   handleClose();
  // }, [handleClose, setDeleteStaff]);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  //   console.log(reviewFeedback);

  return (
    <>
      <div
        className="
            fixed 
            inset-0 
            z-50 
            flex
            items-center
            justify-center
            overflow-x-hidden
            overflow-y-hidden
            bg-neutral-800/70
            bg-opacity-10
            focus:outline-none"
      >
        <div
          className="
            relative 
            my-6 
            w-[80%] 
            opacity-1 
            md:h-auto 
            md:w-3/4 
            lg:h-auto 
            lg:w-[80%]
            xl:w-[80%]
            

            "
        >
          <div
            className={`
            translate
            h-full
            bg-white
            rounded-xl 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            duration-300
            
            `}
          >
            <button
              onClick={onClose}
              className="
                relative
                flex
                justify-end
                rounded-lg
                items-end
                left-[90%]
                p-3
                cursor-pointer 
                hover:opacity-70
                hover:bg-neutral-200
                hover:shadow-lg
                top-5
                duration-150 
                
                "
            >
              <IoMdClose size={18} className="cursor-pointer" />
            </button>
            <div
              className="
                    translate
                    mt-2
                    flex
                    h-full
                    translate-y-0
                    flex-col
                    gap-2
                    p-4
                    opacity-100
                    duration-300

                    max-h-[60vh]

                    overflow-y-scroll 

                    
                    "
            >
              <div
                className="
                text-center
                text-2xl
                font-semibold
                text-neutral-600
                
                "
              >
                Review Feedback
              </div>
              {reviewFeedback?.map((item, index) => {
                return (
                  item.feedBackName &&
                  item.feedBackDescription &&
                  item.feedBackImage &&
                  item.feedBackRating && (
                    <div
                      key={index}
                      className="text-center p-4 font-semibold flex flex-row gap-12"
                    >
                      <div>
                        <Image
                          src={item.feedBackImage as string}
                          width={500}
                          height={200}
                          className="rounded-md"
                          alt="feedback"
                        />
                      </div>

                      <div className="w-full flex flex-col gap-4">
                        <div className="text-lg font-bold">
                          Feedback of{" "}
                          <span className="text-[#ff6347] text-lg">
                            {item.feedBackName}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          Rating:{" "}
                          <span className="ml-3 text-[#ff6347] font-bold">
                            <Rate
                              disabled
                              defaultValue={parseInt(item.feedBackRating)}
                            />
                            {/* ;{item.feedBackRating} stars */}
                          </span>{" "}
                        </div>
                        <div>{item.feedBackDescription}</div>
                      </div>
                    </div>
                  )
                );
              })}
              {/* {reviewFeedback?.map((item, index) => {
                return item.feedBackName &&
                  item.feedBackDescription &&
                  item.feedBackImage &&
                  item.feedBackRating ? (
                  <div
                    key={index}
                    className="text-center p-4 font-semibold flex flex-row gap-12"
                  >
                    <div>
                      <Image
                        src={item.feedBackImage as string}
                        width={500}
                        height={200}
                        className="rounded-md"
                        alt="feedback"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <div className="text-lg font-bold">
                        Feedback of{" "}
                        <span className="text-[#ff6347] text-lg">
                          {item.feedBackName}
                        </span>
                      </div>
                      <div>
                        Rating:{" "}
                        <span className="text-[#ff6347] font-bold">
                          {item.feedBackRating} stars
                        </span>{" "}
                      </div>
                      <div>{item.feedBackDescription}</div>
                    </div>
                  </div>
                ) : (
                  <div key={index}>
                    <ClientOnly>
                      <EmptyState
                        title="Looks like you have no feedback in your work"
                        subtitle="In here you can review the feedback!"
                      />
                    </ClientOnly>
                  </div>
                );
              })} */}

              <div
                className="
                    mt-6
                    flex
                    flex-row
                    justify-center
                    gap-4"
              >
                {/* <div className="w-full cursor-pointer rounded-md bg-red-300 p-2 text-center transition-all duration-200 hover:scale-105 hover:bg-slate-500 hover:shadow-xl focus:bg-blue-400">
                Cancel
              </div> */}
                {/* <Button outline label="Cancel" onClick={onClose} /> */}

                {/* <Button
                  label="Agree"
                  disabled={disabled}
                  onClick={onConfirmDelete}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewFeedbackModal;
