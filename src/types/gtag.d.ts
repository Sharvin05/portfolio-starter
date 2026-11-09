// Globals that Google's gtag.js reads and writes.
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
