import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // You can access request information via req if needed
    // console.log(req.url);

    const url = new URL(req.url);

    const address = url.searchParams.get("address");

    if (process.env.OLA_KEY && address) {
      const url = new URL("https://api.olamaps.io/places/v1/geocode");
      url.searchParams.append("address", address);
      url.searchParams.append("language", "English");
      url.searchParams.append("api_key", process.env.OLA_KEY);

      return fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) =>
          NextResponse.json({
            data: data.geocodingResults[0].geometry.location,
          })
        );
    } else throw new Error("some data is missing");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
