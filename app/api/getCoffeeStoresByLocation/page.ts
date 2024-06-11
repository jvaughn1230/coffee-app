import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  request: NextRequest,
  response: NextResponse
) {
  try {
    console.log(request);
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";

    console.log("limit?", limit);
    console.log("longLat?", longLat);

    if (longLat) {
      const parsedLimit = parseInt(limit, 10);
      if (isNaN(parsedLimit)) {
        return NextResponse.json(
          { error: "Invalid limit parameter" },
          { status: 400 }
        );
      }
      const response = await fetchCoffeeStores(longLat, parsedLimit);
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("There was an error", error);
    return NextResponse.json(`Error Fetching Stores: ${error}`, {
      status: 500,
    });
  }
}
