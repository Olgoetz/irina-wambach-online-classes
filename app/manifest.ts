import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Buchungstool für Online-Yoga-Kurse",
    short_name: "Buchungstool",
    description: "Buchungstool für Online-Yoga-Kurse mit Irina Wambach",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
