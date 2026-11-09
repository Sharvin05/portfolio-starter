"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser, so skip it during server rendering.
export const Background = dynamic(() => import("./components/RibbedGlass").then((m) => m.RibbedGlass), { ssr: false });
