import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/inputs/ListingCard";
import Banner from "./components/navbar/Banner";

export default function Home() {
  return (
    <ClientOnly>
      <div
        className="
        z-0
        w-full
        h-auto
    "
      >
        <div className="">
          <Banner />
        </div>
        <Container>
          {/* <div
            className="
            absolute 
            block 
            bottom-0 
            left-0 
            right-0 
            bg-white 
            max-h-0
            "
          > */}
          <div
            className="
                p-10
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
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
          </div>
          {/* </div> */}
        </Container>
      </div>
    </ClientOnly>
  );
}
