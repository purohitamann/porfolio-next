"use client";
import React from "react";

// Replace interactive Leaflet map with a lightweight static dark-themed Toronto
// map image that links to Google Maps. The image URL is configurable — replace
// `DEFAULT_MAP_IMAGE` with any preferred dark-styled Toronto map image.
const DEFAULT_MAP_IMAGE = "https://render.fineartamerica.com/images/rendered/default/poster/8/5.5/break/images/artworkimages/medium/1/toronto-abstract-city-map-top-view-dark-frank-ramspott.jpg"; // replace with your image

export default function WeatherWidget() {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=43.6532,-79.3832";

  return (
    <div className="w-56 h-56 rounded-lg shadow-md overflow-hidden border border-border/50 bg-background/90">
      <a
        href={mapLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Toronto in Google Maps"
        className="block w-full h-full relative focus:outline-none"
      >
        {/* Background image: dark-themed Toronto map. Swap DEFAULT_MAP_IMAGE as needed. */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.45)), url('${DEFAULT_MAP_IMAGE}')`,
          }}
          aria-hidden
        />

        <div className="absolute left-3 top-3 px-2 py-1 rounded text-xs font-medium text-foreground bg-background/60 backdrop-blur">
          Toronto
        </div>

        <div className="absolute right-3 bottom-3">
          <span className="inline-flex items-center gap-2 rounded px-2 py-1 text-xs bg-muted/60 text-muted-foreground">
            View on Maps
          </span>
        </div>
      </a>
    </div>
  );
}
