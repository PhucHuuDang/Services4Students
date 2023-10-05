"use client";

import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";

const ListingClient = () => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-24">
        <div className="flex flex-col gap-6">
          <ListingHead title="Title of listing head" />

          <div className="
              grid
              grid-cols-1
          ">

          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
