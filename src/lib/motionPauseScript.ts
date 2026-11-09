// Shared by the server layout and the client hook, so no "use client" here.
export const MOTION_STORAGE_KEY = "motion";

/** Inlined in <head>: restores a saved "paused" choice before the page paints. */
export const motionInitScript = `try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}`;
