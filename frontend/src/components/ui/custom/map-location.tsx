import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/tw-merge";

interface MapLocationProps {
  location?: string | { lat: number; lng: number };
  width?: string | number;
  height?: string | number;
  zoom?: number;
  mapType?: "roadmap" | "satellite";
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
  className?: string;
}

const MapLocation: React.FC<MapLocationProps> = ({
  location,
  width = "100%",
  height = "100%",
  zoom = 16,
  mapType = "roadmap",
  loading = "lazy",
  style,
  className,
}) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  useEffect(() => {
    const mapTypeParam = mapType === "satellite" ? "k" : "m";
    let url = "";

    if (location) {
      if (typeof location === "string") {
        const query = encodeURIComponent(location);
        url = `https://maps.google.com/maps?q=${query}&t=${mapTypeParam}&z=${zoom}&output=embed`;
      } else if (location.lat !== undefined && location.lng !== undefined) {
        const { lat, lng } = location;
        url = `https://maps.google.com/maps?q=${lat},${lng}&t=${mapTypeParam}&z=${zoom}&output=embed`;
      }
    } else {
      url = `https://maps.google.com/maps?ll=0,0&t=${mapTypeParam}&z=3&output=embed`;
    }

    setMapUrl(url);
  }, [location, zoom, mapType]);

  return (
    <iframe
      allowFullScreen
      className={cn(className, "rounded-lg")}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl || "https://maps.google.com/maps?ll=0,0&t=m&z=3&output=embed"}
      style={{ border: 0, ...style }}
      title="Google Maps"
      width={width}
    />
  );
};

export default MapLocation;
