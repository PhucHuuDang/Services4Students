"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import { FaLocationArrow } from "react-icons/fa";

import EmptyState from "../EmptyState";
import { useCallback, useMemo, useRef, useState } from "react";

const center = { lat: 10.845453, lng: 106.836512 };

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  const calculate = async () => {
    if (
      originRef.current?.value === "" ||
      destinationRef.current?.value === ""

      // !originRef.current ||
      // !destinationRef.current ||
      // !originRef.current.value ||
      // !destinationRef.current.value
    ) {
      return;
    }

    const originValue = originRef.current?.value as string;
    const destinationValue = destinationRef.current?.value as string;

    if (!originRef || !destinationRef) {
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originValue,
      destination: destinationValue,
      travelMode: google.maps.TravelMode.DRIVING,
      // polylineOption: {}
      // polylineOptions: {
      //   strokeColor: "red", // Change the color to your desired color
      // },
    });

    setDirectionResponse(result);
    // Check if routes and legs are defined before accessing them
    if (result.routes && result.routes.length > 0) {
      const route = result.routes[0];
      if (route.legs && route.legs.length > 0) {
        const leg = route.legs[0];
        if (leg.distance) {
          setDistance(leg.distance.text || "N/A");
        }
        if (leg.duration) {
          setDuration(leg.duration.text || "N/A");
        }
      }
    }
  };

  const clearValue = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) {
      originRef.current.value = "";
    }

    if (destinationRef.current) {
      destinationRef.current.value = "";
    }
  };

  const onLoad = (autocomplete: any) => {
    autocomplete.setOptions({
      types: ["geocode"],
      componentRestrictions: { country: "VN" }, // the region country
    });

    // Add event listeners to the Autocomplete instance
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("Place details not found.");
        return;
      }

      const name = place.name;
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      console.log("Name: " + name);
      console.log("Address: " + address);
      console.log("Latitude: " + lat);
      console.log("Longitude: " + lng);

      // Do something with the selected place data, e.g., update state
      // For example, if you want to update a state variable with the selected place:
      // setSelectedPlace({ name, address, lat, lng });
    });
  };

  if (!isLoaded) {
    return <EmptyState title="Maps Loading..." />;
  }

  return (
    <div
      className="
        
    "
    >
      <div
        className="
            flex 
            flex-row 
            items-center 
            justify-center
            w-auto
            relative
        "
      >
        <div
          className="
                w-full
                flex
                items-center
                justify-center               
                "
        >
          <div
            className="
                flex
                flex-col
                gap-2
                p-2
                bg-white
                rounded-lg
                absolute
                left-4
                top-4
                z-10
            "
          >
            <div
              className="
                    p-3 
                    flex 
                    flex-row 
                    gap-2 
                    items-center 
                    justify-center 
                    w-full 
                    
                      
                "
            >
              <Autocomplete>
                <input
                  className="
                    pl-2 
                    w-full 
                    rounded-md 
                    py-1
                    border-[2px] 
                    border-gray-400
                    focus:border-gray-700
                    outline-none
                    duration-200
                    
                    "
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                />
              </Autocomplete>

              <Autocomplete onLoad={onLoad}>
                <input
                  className="
                    pl-2 
                    py-1 
                    w-full 
                    rounded-md 
                    border-[2px] 
                    border-gray-400
                    focus:border-gray-700
                    outline-none
                    duration-150
                "
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>
              <div
                onClick={calculate}
                className="
                    p-2 
                    rounded-full 
                    cursor-pointer
                    bg-neutral-200
                    hover:bg-neutral-400
                    hover:scale-105
                    transition
                    duration-200
                    "
              >
                <BsSearch size={24} />
              </div>

              <div onClick={clearValue}>
                <AiOutlineClose size={24} />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between p-3">
              <div>Distance: {distance}</div>

              <div>Duration: {duration}</div>

              <div
                onClick={() => map?.panTo(center)}
                className="
                    rounded-full 
                    p-2 
                    bg-neutral-200 
                    hover:bg-neutral-400
                    hover:scale-105
                    cursor-pointer
                    transition
                    duration-200

                    "
              >
                <FaLocationArrow size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute h-full w-full">
        {/* <div className="h-full w-full absolute"> */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
          {/* display maker or direction */}
        </GoogleMap>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Maps;
