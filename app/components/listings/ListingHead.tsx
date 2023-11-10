import Image from "next/image";
import Heading from "../Heading";

interface ListingHeadProps {
  title: string;
  imageSrc?: string;
  id?: string;
  subtitle?: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc = "",
  id,
  subtitle,
}) => {
  return (
    <>
      <Heading
        title={title.toUpperCase()}
        // subtitle="The listing detail of page"
        subtitle={subtitle}
        center
      />

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
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default ListingHead;
