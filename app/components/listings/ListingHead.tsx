import Image from "next/image";
import Heading from "../Heading";

interface ListingHeadProps {
  title: string;
  imageSrc?: string;
  id?: string;
  
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, id }) => {
  return (
    <>
      <Heading title={title} subtitle="The listing test" />

      <div
        className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative

        "
      >
        <Image
          alt="Image"
          src="/images/glamping.webp"
          fill
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default ListingHead;
