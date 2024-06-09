import { MapboxType } from "@/types";

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: any }) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};

const transformCoffeeData = (
  idx: number,
  result: MapboxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.address || "",
    name: result.text,
    imgUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=${longLat}&access_token=${process.env.MAPBOX_API}`
    );

    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    return data.features.map((result: MapboxType, idx: number) =>
      transformCoffeeData(idx, result, photos)
    );
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
  console.log("running fetch coffee store");
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    const coffeeStore = data.features.map((result: MapboxType, idx: number) =>
      transformCoffeeData(parseInt(queryId), result, photos)):
    

    return coffeeStore.length > 0 ? coffeeStore[0] : {};
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};
