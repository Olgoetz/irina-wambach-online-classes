"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import getStripe from "@/lib/get-stripejs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Clock, Calendar, Euro, CalendarX } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutProps {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  time: string;
  price: number;
}

const converter = (price: number) => {
  const final: string = (price / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  return final;
};

const ValidProduct = ({
  product,
  buttonBgColor,
}: {
  product: any;
  buttonBgColor: string;
}) => {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const checkout = async (product: CheckoutProps) => {
    setIsRedirecting(true);
    const res = await axios.post(
      "/api/checkout",
      { body: product },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const stripe = await getStripe();

    await stripe!.redirectToCheckout({ sessionId: res.data.session_id });
    setIsRedirecting(false);
  };
  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <div className="relative mb-6 h-[300px] overflow-hidden">
              <Image
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={product.product.images[0]}
                alt={product.product.name.toLowerCase()}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              />
            </div>

            <CardTitle className="text-xl">{product.product.name}</CardTitle>
            <CardDescription className="text-justify md:h-24">
              {product.product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 ">
            <div className="flex">
              <Calendar className="mr-5" />

              <p>Datum: {product.product.metadata.Datum}</p>
            </div>
            {product.product.metadata.Ablaufdatum && (
              <div className="flex">
                <CalendarX className="mr-5" />

                <p>gültig bis: {product.product.metadata.Ablaufdatum}</p>
              </div>
            )}
            <div className="flex">
              <Clock className="mr-5" />

              <p>Uhrzeit: {product.product.metadata.Uhrzeit}</p>
            </div>

            <div className="flex">
              <Euro className="mr-5" />

              <p>Preis: {converter(product.price.unit_amount)}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className={cn("w-full", buttonBgColor)}
              onClick={() => checkout(product)}
            >
              {!isRedirecting ? "Buchen" : <BeatLoader color="white" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ValidProduct;
