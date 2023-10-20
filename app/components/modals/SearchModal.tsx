"use client";

import Image from "next/image";
import React, {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { IoMdClose } from "react-icons/io";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import useSearchModal from "@/app/hooks/useSearchModal";
import SearchItem from "../navbar/SearchItem";
import { ServiceProp } from "@/app/types";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  getService: ServiceProp[];
}

const SearchModal: React.FC<SearchModalProps> = ({ getService }) => {
  const searchModal = useSearchModal();
  const [showModal, setShowModal] = useState(searchModal.isOpen);
  const [search, setSearch] = useDebouncedState("", 100, { leading: true });
  const router = useRouter();

  //   const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //   useEffect(() => {
  //     const focusTimeout = setTimeout(() => {
  //       if (inputRef.current) {
  //         inputRef.current.focus();
  //       }
  //     }, 300);
  //     return () => clearTimeout(focusTimeout);
  //   }, [searchModal]);

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    // if we set true, the animation can't happen cause we hard code to set showModal = true
    // setShowModal(true);
    setShowModal(searchModal.isOpen);

    return () => clearTimeout(focusTimeout);
  }, [searchModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      searchModal.onClose();
    }, 300);
  }, [searchModal]);

  const handleClickOutSide = useCallback(
    (e: React.MouseEvent<HTMLDivElement | HTMLInputElement>) => {
      if (!(e.target instanceof HTMLInputElement)) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleKeyEscClose = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!searchModal.isOpen) {
    return null;
  }

  // console.log(showModal);

  return (
    <>
      <div
        onKeyUp={handleKeyEscClose}
        className="
        pt-20
        justify-center
        flex
        overflow-x-hidden
        overflow-y-hidden
        fixed
        inset-0
        z-50
        opacity-1
        outline-none
        focus:outline-none
        bg-neutral-900
        bg-opacity-90
    
    "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-5/6
            xl:w-6/6
            justify-center
            my-6
            h-full
            lg:h-auto
            md:h-auto
        "
        >
          <div
            className={`
            translate
            duration-500
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
            relative
            flex
            flex-col
            w-full
            outline-none
            focus:outline-none
          "
            >
              <div
                onClick={handleClickOutSide}
                className="
                flex
                items-center
                justify-center
                pt-6
                px-6
                rounded-t
                relative
                border-b-[1px]
            "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-2
                    border-0
                    hover:opacity-70
                    transition
                    top-0
                    bg-transparent
                    right-0
                    absolute
                    rounded-md
                "
                >
                  <IoMdClose
                    size={25}
                    className="
                      text-white 
                      hover:text-neutral-400 
                      hover:text-opacity-1
                      translate
                      duration-300"
                  />
                </button>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src="/images/bg-search.png"
                    alt="bg-image"
                    width={800}
                    height={200}
                  />
                  <div className="mt-5">
                    <div className="text-white font-semibold text-lg">
                      Services, coming to your home 20 minutes... having 73220
                      locations in TP. HCM from 6:00 - 22:00
                    </div>
                    <div className="mt-5">
                      <input
                        ref={inputRef}
                        type="text"
                        className="
                        w-full 
                        text-center
                        text-white 
                        text-lg
                        bg-transparent
                        rounded-lg
                        p-2
                        outline-none
                        focus:outline-none

                        "
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <Input
                  searchField
                  id="search"
                  label=""
                  register={register}
                  errors={errors}
                /> */}
                </div>
              </div>
              {/* ${search ? "flex" : "hidden"} */}
              <div
                className={`
                  flex 
                  flex-col
                  items-center 
                  justify-center
                  mt-1 
                  h-auto
                  text-black 
                  cursor-pointer 
                  rounded-lg
                  
                  `}
              >
                <div
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
                  {/* <div className="p-4">
                    Content of search Content of search Content of search
                  </div> */}
                </div>
                <>
                  {getService
                    .filter((value) => {
                      return search.toLowerCase() === ""
                        ? value
                        : value.serviceName
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map((item: ServiceProp) => {
                      return (
                        !item.isDelete && (
                          <SearchItem
                            key={item.id}
                            onClick={() => {}}
                            label={item.serviceName}
                            data={item}
                          />
                        )
                      );
                    })}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
