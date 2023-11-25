"use client";

import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import { memo, useCallback, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import Modal from "../modals/Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useSearchModal from "@/app/hooks/useSearchModal";
import useRegisterStaffModal from "@/app/hooks/useRegisterStaffModal";
import useAddServiceModal from "@/app/hooks/useAddServiceModal";
import useComboModal from "@/app/hooks/useComboModal";
import useStoreBooking from "@/app/hooks/useStoreBooking";
import useManageCategoriesModal from "@/app/hooks/useManageCategoriesModal";
import { ServiceOfBookingDetails } from "@/app/types";
import CreateAttendanceModal from "../modals/CreateAttendanceModal";
import useCreateAttendanceModal from "@/app/hooks/useCreateAttendanceModal";

interface UserMenuProps {
  currentUser?: any | null;
  isAdmin?: string | null;
  servicesOfBookingDetails?: ServiceOfBookingDetails[];
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  isAdmin,
  servicesOfBookingDetails,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const registerStaffModal = useRegisterStaffModal();
  const addServiceModal = useAddServiceModal();
  const searchModal = useSearchModal();
  const comboModal = useComboModal();
  const manageCategories = useManageCategoriesModal();
  const createAttendance = useCreateAttendanceModal();

  const useStoreBookingShow = useStoreBooking();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onAddServicesModal = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    addServiceModal.onOpen();
  }, [currentUser, addServiceModal, loginModal]);

  console.log(isAdmin);

  // console.log(loginModal.onOpen);

  return (
    <>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={searchModal.onOpen}
            className={`
            flex
            flex-row
            items-center 
            cursor-pointer
            rounded-md 
            p-1
            hover:text-neutral-500
            transition
            duration-300
            translate
            hover:scale-150
            font-medium
            `}
          >
            <BsSearch size={21} />
          </div>
          <div
            className={`text-2xl font-light after:content-["|"]  before:pr-4 bg-white`}
          ></div>

          <div
            className="
            
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4
            md:px-2
            md:py-1 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
          >
            {isAdmin === "Admin" ? (
              <div
                onClick={onAddServicesModal}
                className="
            flex
            flex-row
            items-center
            gap-3
            p-1
            md:p-0
            lg:p-1
            "
              >
                <AiOutlineShoppingCart size={21} />
                <div>Add more services</div>
              </div>
            ) : isAdmin === "Staff" ? (
              <div
                // onClick={useStoreBookingShow.onOpen}
                onClick={() => router.push("/reportWork")}
                className="
            flex
            flex-row
            items-center
            gap-3
            p-1
            md:p-0
            lg:p-1
            "
              >
                <AiOutlineSchedule size={21} />
                <div>Report work</div>
              </div>
            ) : servicesOfBookingDetails &&
              servicesOfBookingDetails.length > 0 ? (
              <div className="flex flex-row items-center gap-4">
                <div
                  // onClick={useStoreBookingShow.onOpen}
                  onClick={createAttendance.onOpen}
                  className="
                  flex
                  flex-row
                  items-center
                  justify-center
                  gap-3
                  p-1
                  md:p-0
                  lg:p-2
                  hover:bg-[#489bee]
                  rounded-full
                  w-[120px] 
                  duration-200


                  "
                >
                  <IoCreateOutline size={21} />
                  <div> Attendance</div>
                </div>

                <div
                  // onClick={useStoreBookingShow.onOpen}
                  onClick={() => router.push("/cart")}
                  className="
                  flex
                  flex-row
                  items-center
                  gap-3
                  p-1
                  md:p-0
                  lg:p-2
                  w-[120px]
                  hover:bg-[#489bee]

                  rounded-full
                  duration-200


            "
                >
                  <AiOutlineShoppingCart size={21} />
                  <div>Your cart</div>
                </div>
              </div>
            ) : (
              <div
                // onClick={useStoreBookingShow.onOpen}
                onClick={() => router.push("/cart")}
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    p-1
                    md:p-0
                    lg:p-1
                    "
              >
                <AiOutlineShoppingCart size={21} />
                <div>Your cart</div>
              </div>
            )}
            {/* <div
            onClick={onAddServicesModal}
            className="
            flex
            flex-row
            items-center
            gap-3
            p-1
            md:p-0
            lg:p-1
            "
          >
            <AiOutlineShoppingCart size={21} />
            {isAdmin === "Admin" ? (
              <div>Add more services</div>
            ) : (
              <div>Your cart</div>
            )}
          </div> */}
          </div>
          <div
            onClick={toggleOpen}
            className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src="/images/avatarPlaceHolder.jpg" />
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  {isAdmin === "Admin" ? (
                    <>
                      <MenuItem
                        label="Manage Staff Account"
                        onClick={() => router.push("/manageStaff")}
                      />

                      <MenuItem
                        label="Manage User Account"
                        onClick={() => router.push("/manageUser")}
                      />

                      <MenuItem
                        label="Manage Properties Combo"
                        onClick={() => router.push("/propertiesCombo")}
                      />

                      <MenuItem
                        label="Manage Properties"
                        onClick={() => router.push("/properties")}
                      />

                      <MenuItem
                        label="Manage Categories"
                        onClick={manageCategories.onOpen}
                      />

                      <MenuItem
                        label="Assign task for staff"
                        onClick={() => router.push("/assign")}
                      />

                      <MenuItem
                        label="Manage dashboard"
                        onClick={() => router.push("/dashboard")}
                      />

                      <MenuItem
                        label="Manage dashboard order"
                        onClick={() => router.push("/dashboardOrder")}
                      />

                      <MenuItem
                        label="Add more services"
                        onClick={addServiceModal.onOpen}
                      />

                      <MenuItem
                        label="Sign up staff"
                        onClick={registerStaffModal.onOpen}
                      />

                      <MenuItem
                        label="Create Package(combo)"
                        onClick={comboModal.onOpen}
                      />

                      <MenuItem label="Log out" onClick={() => signOut()} />
                    </>
                  ) : isAdmin === "Staff" ? (
                    <>
                      <MenuItem label="Review feedback" onClick={() => {}} />

                      <MenuItem
                        label="Report work"
                        onClick={() => router.push("/reportWork")}
                      />

                      <MenuItem label="Log out" onClick={() => signOut()} />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        label="My Cart"
                        onClick={() => router.push("/cart")}
                      />

                      <MenuItem
                        label="Attendance work"
                        onClick={() => router.push("/attendance")}
                      />

                      <MenuItem label="Log out" onClick={() => signOut()} />
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* first click login and register will be set true to show */}
                  <MenuItem label="Login" onClick={loginModal.onOpen} />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <CreateAttendanceModal
        servicesOfBookingDetails={
          servicesOfBookingDetails !== undefined ? servicesOfBookingDetails : []
        }
      />
    </>
  );
};

export default memo(UserMenu);
