import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/account/login",
    display: "standalone",
    orientation: "portrait",
    background_color: "#131315",
    theme_color: "#6a00fd",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
