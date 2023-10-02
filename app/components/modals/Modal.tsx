"use client";

import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  // console.log(showModal);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    // call this function when click in LoginModal
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  const onEscCloseModal = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if (e.keyCode === 27) {
        setShowModal(false);

        setTimeout(() => {
          onClose();
        }, 300);
      }
    },
    [disabled, onClose]
  );

  const onSubmitEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onKeyUp={onEscCloseModal}
        onKeyDown={onSubmitEnter}
        className="
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-hidden
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
    "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            h-full
            lg:h-auto
            md:h-auto        
        "
        >
          {/* Content Part */}
          <div
            className={`
                translate
                duration-300
                h-full
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
                
            `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
            "
            >
              {/* Header Part */}
              <div
                className="
                    flex
                    items-center
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold text-center">{title}</div>
              </div>
              {/* Body part */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* Footer part */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {/* Your cart button */}

                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
