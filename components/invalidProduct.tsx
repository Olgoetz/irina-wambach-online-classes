import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Stripe from "stripe";

const InvalidProduct = ({ product }: { product: any }) => {
  return (
    <>
      <div key={product.product.id}>
        <Card className="bg-red-400">
          <CardHeader>
            <CardTitle>{product.product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              Kann nicht angezeigt werden werden, da folgende Metadaten im
              Produkt fehlen (Beachte die genaue Schreibweise):
            </p>
            <ul className="flex flex-col">
              {product.missingProps.map((e: any) => (
                <p key={e}>- {e}</p>
              ))}
            </ul>
            <p>Aktuell sind folgende gesetzt:</p>
            <ul className="flex flex-col">
              {Object.keys(product.product.metadata).map((e: any) => (
                <p key={e}>- {e}</p>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InvalidProduct;
