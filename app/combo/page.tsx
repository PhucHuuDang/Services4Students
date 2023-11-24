import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";
import getPackages from "../components/actions/getPackages";
import ListingCard from "../components/inputs/ListingCard";
import { PackageProps } from "../types";

const ComboPage = async () => {
  const getPackage = await getPackages();

  // console.log(getPackage);

  return (
    <ClientOnly>
      <Container>
        <div className="pt-20">
          <div className="mt-10">
            <Heading
              title="Package suit for your choice!"
              subtitle="Monthly or services retail"
              center
            />
          </div>
        </div>

        <div
          className="
            pt-20
            grid
            gird-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
                
            "
        >
          {getPackage.map((item: PackageProps) => {
            return (
              !item.isDelete && (
                <ListingCard comboDiscount key={item.id} packageData={item} />
              )
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default ComboPage;
