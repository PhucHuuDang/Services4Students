"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface DeleteModalProps {
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  deleteName: string;
  onConfirmDelete: () => void;
  user?: boolean;
  deleteMail?: string;
  properties?: boolean;
  deleteCreatedBy?: string;
  combo?: boolean;
  category?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  disabled,
  onClose,
  deleteName,
  onConfirmDelete,
  user,
  deleteMail,
  properties,
  deleteCreatedBy,
  combo,
  category,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

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
            w-2/4 
            opacity-1 
            md:h-auto 
            md:w-2/4 
            lg:h-auto 
            lg:w-2/5 
            xl:w-2/5"
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
                    duration-300"
            >
              <div
                className="
                text-center
                text-xl
                font-semibold
                
                
                "
              >
                Are you sure to remove
              </div>
              <div className="text-center p-4 font-semibold">
                <span className="text-[#ff6347] font-semibold text-xl">
                  {deleteName}{" "}
                </span>{" "}
                {properties ? (
                  <span className="font-semibold">
                    {combo ? "Combo" : "Service"} that created by{" "}
                    <span className="text-[#0e2a5dd4] font-bold text-lg">
                      {deleteCreatedBy}
                    </span>
                  </span>
                ) : user ? (
                  <span className="font-semibold">
                    Student who has email{" "}
                    <span className="text-[#0e2a5dd4] font-bold text-lg">
                      {deleteMail}
                    </span>
                  </span>
                ) : category ? (
                  <span className="font-semibold">CateGory </span>
                ) : (
                  // "Staff"
                  <span className="font-semibold">
                    Staff who has email{" "}
                    <span className="text-[#0e2a5dd4] font-bold text-lg">
                      {deleteMail}
                    </span>
                  </span>
                )}
              </div>
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
                <Button outline label="Cancel" onClick={onClose} />
                {/* <div className="w-full cursor-pointer rounded-md bg-red-300 p-2 text-center transition-all duration-200 hover:scale-105 hover:bg-slate-500 hover:shadow-xl focus:bg-blue-400">
                Agree
              </div> */}
                <Button
                  label="Agree"
                  disabled={disabled}
                  onClick={onConfirmDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
