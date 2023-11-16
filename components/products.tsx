"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stripe from "stripe";

import { Skeleton } from "./ui/skeleton";
import {
  checkHasProperties,
  containsSubstringCaseInsensitive,
  isDateOlder,
} from "@/lib/utils";
import {
  INFO_EMAIL_ADDRESS,
  LIVE_PRODUCT_METADATA_PROPS,
  RECORDING_PRODUCT_ACTIVE,
  RECORDING_PRODUCT_METADATA_PROPS,
} from "@/lib/config";
import ValidProduct from "./validProduct";
import { Separator } from "./ui/separator";
import InvalidProduct from "./invalidProduct";

const Products = () => {
  const [validProductsLive, setValidProductsLive] = useState<any>();
  const [validProductsRecording, setValidProductsRecording] = useState<any>();

  const [invalidProductsLive, setInvalidProductsLive] = useState<any>();
  const [invalidProductsRecording, setInvalidproductsRecording] =
    useState<any>();

  useEffect(() => {
    console.log("Component has rendered.");
    const getProducts = async () => {
      const response = await axios.get("/api/products");

      // Make sure to get only active products
      const activeProducts = response.data.filter((e: any) => e.product.active);

      let invalidProductsRecording: any[] = [];
      let validProductsRecording: Stripe.Product[] = [];

      // HANDLE PRODUCTS - Recordings
      // Filter out products that are recordings

      if (RECORDING_PRODUCT_ACTIVE) {
        const recordings = activeProducts.filter((e: any) =>
          containsSubstringCaseInsensitive(e.product.name, "aufzeichnung")
        );

        // Check if products have the required metadata
        recordings.forEach((e: any) => {
          let missingProps: string[] = checkHasProperties(
            e.product.metadata,
            RECORDING_PRODUCT_METADATA_PROPS
          );
          if (missingProps.length > 0) {
            let newObject: any = { ...e, missingProps };
            invalidProductsRecording.push(newObject);
          } else {
            validProductsRecording.push(e);
          }
        });

        // Check if products have expired
        const bookableProductsRecordings = validProductsRecording.filter(
          (e: any) =>
            isDateOlder(
              e.product.name,
              e.product.metadata.Ablaufdatum,
              e.product.metadata.Uhrzeit
            )
        );
        setValidProductsRecording(bookableProductsRecordings);
        setInvalidproductsRecording(invalidProductsRecording);
      }
      // HANDLE PRODUCTS - Live
      // Filter out products that are live
      let invalidProductsLive: any[] = [];
      let validProductsLive: Stripe.Product[] = [];
      const lives = activeProducts.filter(
        (e: any) =>
          !containsSubstringCaseInsensitive(e.product.name, "aufzeichnung")
      );

      // Check if products have the required metadata
      lives.forEach((e: any) => {
        let missingProps: string[] = checkHasProperties(
          e.product.metadata,
          LIVE_PRODUCT_METADATA_PROPS
        );
        if (missingProps.length > 0) {
          let newObject: any = { ...e, missingProps };
          invalidProductsLive.push(newObject);
        } else {
          validProductsLive.push(e);
        }
      });
      // Filter out products that are in the past
      const bookableProductsLive = validProductsLive.filter((e: any) =>
        isDateOlder(
          e.product.name,
          e.product.metadata.Datum,
          e.product.metadata.Uhrzeit
        )
      );

      setValidProductsLive(bookableProductsLive);
      setInvalidProductsLive(invalidProductsLive);
      // const filteredProducts =
      //   filteredRecordingProducts.concat(filteredLiveProducts);

      // Extract only the products that are live
      // const filteredProductsLive = filteredProducts.filter(
      //   (e: any) => !e.product.name.toLowerCase().includes("aufzeichnung")
      // );

      // // Extract only the products that are recordings
      // const filteredProductsRecording = filteredProducts.filter((e: any) =>
      //   e.product.name.toLowerCase().includes("aufzeichnung")
      // );
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold ">
          Meine aktuellen Online-Fitness-Kurse
        </h1>
        {/* <h2 className="text-gray-500 text-3xl text-center mt-2">
          LIVE via Zoom und Aufzeichnungen
        </h2> */}

        {/* Show a sticker if no product is available */}
        {(validProductsLive && validProductsLive.length === 0) ||
          (validProductsRecording && validProductsRecording.length === 0 && (
            <div className="mt-14 text-center space-y-4 items-center justify-center h-full">
              <p>Leider biete ich zurzeit keine Online-Kurse an.</p>
              <p>
                Schau gerne demnächst wieder vorbei oder trete meiner WhatsApp
                Gruppe bei.
              </p>
              <p>
                Gerne kannst du mir auch eine Email an{" "}
                <a className="text-gray-500" href="mailto:{INFO_EMAIL_ADDRESS}">
                  {INFO_EMAIL_ADDRESS}
                </a>{" "}
                schreiben.
              </p>
              {/* <div className="w-full mx-auto flex justify-center">
                <Image
                  width={300}
                  height={300}
                  src="/wa_gruppe.jpeg"
                  alt="WhatsApp Gruppe"
                  priority
                />
              </div> */}
            </div>
          ))}

        {/* Show valid products live */}
        <h2 className="text-[#309697] text-3xl text-center my-10">
          Live via Zoom
        </h2>
        <p className="text-justify md:text-center mb-8">
          Trainiere in einem Live Stream mit mir. Nach der Buchung erhältst Du
          eine Rechnung und die Zugangsdaten an Deine im Buchungsschritt
          angegebene Email-Adresse.
        </p>

        {/* Show a skeleton if products are not loaded yet */}
        {!validProductsLive && (
          <div className="grid md:grid-cols-3 w-full gap-x-3 mt-20 items-center">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between space-y-3"
              >
                <Skeleton className="h-[120px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            ))}
          </div>
        )}
        {validProductsLive && (
          <div className="grid md:grid-cols-3 gap-3">
            {validProductsLive.map((e: any) => (
              <ValidProduct
                key={e.product.id}
                product={e}
                buttonBgColor="bg-[#309697]  hover:bg-[#309697]/70"
              />
            ))}
          </div>
        )}

        {/* Show invalid lives */}
        {invalidProductsLive && (
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {invalidProductsLive.map((e: any) => (
              <InvalidProduct key={e.product.id} product={e} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
