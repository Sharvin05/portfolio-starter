interface ExternalLinkProps {
  target?: "_blank";
  rel?: "noopener noreferrer";
}

/** True for links to another website (http/https). */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Spread onto an <a>: links to other websites open in a new tab. */
export function linkProps(href: string): ExternalLinkProps {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
