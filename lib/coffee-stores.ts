import { MapboxType } from "@/types";

const transformCoffeeData = (result: MapboxType) => {
  return {
    id: result.id,
    address: result.properties?.address || "",
    name: result.text,
    imgUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
};

export const fetchCoffeeStores = async (longLat: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=${longLat}&access_token=${process.env.MAPBOX_API}`
    );

    const data = await response.json();

    return data.features.map((result: MapboxType) =>
      transformCoffeeData(result)
    );
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};

export const fetchCoffeeStore = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();

    const transformedCoffeeData = data.features.map((result: MapboxType) =>
      transformCoffeeData(result)
    );

    return transformedCoffeeData.length > 0 ? transformedCoffeeData[0] : {};
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};
