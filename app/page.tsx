import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/inputs/ListingCard";

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
        </div>
      </Container>
    </ClientOnly>
  );
}
