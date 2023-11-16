import stripe from "@/lib/get-stripe";
import { NextResponse } from "next/server";
export const revalidate = 10;
export async function GET(req: Request) {
  const products = await stripe.products.list();
  // Loop through the products and retrieve associated prices
  //   const productsWithPrices = await Promise.all(
  //     products.data.map(async (product) => {
  //       const prices = await stripe.prices.list({
  //         product: product.id,
  //       });

  //       return {
  //         product: product,
  //         prices: prices.data,
  //       };
  //     })
  //   );
  //   console.log(productsWithPrices);
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        product: product,
        price: price.data[0],
      };
    })
  );
  console.log("[API_PRODUCTS]", productsWithPrices.length);
  // console.log("[API_PRODUCTS]", productsWithPrices);
  return NextResponse.json(productsWithPrices, { status: 200 });
}
