"use client";

import React, {useEffect} from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

const NearbyCoffeeStores = () => {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation(){
      if(longLat){
        const response = await fetchCoffeeStores(longLat)
        const coffeeStores = response.json();
      }
    }
  }, [longLat])

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating" : "View Stores Nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores Near Me
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {}
        </div>
      </div>
    </div>
  );
};

export default NearbyCoffeeStores;
