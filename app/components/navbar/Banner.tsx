"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="w-full overflow-hidden z-0">
      <Image
        src="/images/main-banner.jpeg"
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        // style={{ width: "100%", height: "400px", objectFit: "cover" }}
        className="w-full h-[90vh] object-cover"
      />
      <h1
        className="
              absolute 
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
  );
};

export default Banner;
