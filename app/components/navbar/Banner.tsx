"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="w-full xl:h-screen lg:h-[100vh] md:h-[100vh] h-[100vh] z-0 overflow-hidden">
      {/* <div className="bg-cover bg-center"> */}
      <div className="relative xl:pb-[55%] lg:pb-[70%] md:pb-[75%] sm:pb-[90%] pb-[95%] ">
        <Image
          src="/images/main-banner.jpeg"
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          // style={{ width: "100%", height: "400px", objectFit: "cover" }}
          // style={{ imageRendering: "100px", }}
          className="absolute top-0 w-full h-screen object-cover  "
        />
        {/* </div> */}
        <h1
          className="
              absolute
              block 
              text-xl
              font-mono
              font-medium
              text-white 
              top-1/2 
              left-1/2 
              -translate-x-1/2 
              -translate-y-1/2
              text-center
              w-full

          "
        >
          <TypeAnimation
            preRenderFirstString
            sequence={[
              // Same substring at the start will only be typed once, initially
              "A Tidy House, A Happy Home!",
              1000,
              "Satisfy Your Hunger, Quench Your Thirst - All in One Delivery!",
              1000,
              "Your Safety, Our Priority: Defending Against Fire",
              1000,
              "Your Satisfaction, Our Sole Mission!",
              1000,
            ]}
            // style={{ fontSize: "10em" }}
            // className="text-sm"
            speed={60}
            repeat={Infinity}
            deletionSpeed={60}
          />
        </h1>
      </div>
    </div>
  );
};

export default Banner;
