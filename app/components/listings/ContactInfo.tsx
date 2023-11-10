"use client";

import Link from "next/link";
import { BiConversation } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { PiMessengerLogoBold } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";

const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[40px]">
      <div className="flex flex-row gap-2 items-center justify-center">
        <BiConversation size={24} />
        <span className="font-bold text-md">Contact with us</span>
      </div>

      <div className="flex flex-col justify-center gap-2 w-[260px] h-[64px] ml-10">
        <span className="font-bold flex flex-row items-center gap-1">
          {" "}
          <AiOutlineMail size={18} /> Email:
        </span>
        <span className="font-semibold text-neutral-700">
          danghuuphuc001@gmail.com
        </span>
      </div>

      <div className="flex flex-col  w-[260px] h-[64px] ml-10">
        <span className="font-bold flex flex-row items-center gap-1">
          <PiMessengerLogoBold size={18} /> Messenger:
        </span>
        <span className="font-semibold text-neutral-700">Services4S</span>

        {/* <Link href="https://www.facebook.com/HP2K2Official/"> */}
        <Link
          className="flex flex-row items-center gap-2 hover:text-[#ff6347] transition-transform transform hover:translate-x-1 duration-200"
          href="https://www.messenger.com/t/100040434947735"
        >
          Get in touch <AiOutlineArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col gap-2 w-[260px] h-[280px] ml-10">
        <span className="font-bold flex flex-row items-center gap-1">
          {" "}
          <GrLocation size={18} />
          Address:
        </span>
        <span className="font-semibold text-neutral-700">
          Số 512 đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, TP. Hồ Chí
          Minh (TP. Thủ Đức mới)
        </span>
      </div>
    </div>
  );
};

export default ContactInfo;
