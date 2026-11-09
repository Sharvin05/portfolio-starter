import type { Role, YearMonth } from "@content";
import { ui } from "@content";

// Fixed locale and time zone, so server and browser render the same text
const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

function parse(value: YearMonth): [year: number, month: number] {
  const [y, m] = value.split("-").map(Number);
  return [y ?? 0, m ?? 1];
}

/** "Sep 2022" (en-US uses three-letter months) */
function formatMonth(year: number, month: number): string {
  return monthYear.format(new Date(Date.UTC(year, month - 1, 1)));
}

/** "Sep 2022 – Present" */
export function formatRange(role: Role): string {
  const [sy, sm] = parse(role.start);
  const start = formatMonth(sy, sm);
  if (role.end === "present") return `${start} – ${ui.experience.present}`;
  const [ey, em] = parse(role.end);
  return `${start} – ${formatMonth(ey, em)}`;
}

/**
 * "4 yrs 3 mos", counted inclusively like LinkedIn.
 * Ongoing roles need `now`; without it they return an empty string,
 * so server and client render the same markup before hydration.
 */
export function formatDuration(role: Role, now?: Date): string {
  const [sy, sm] = parse(role.start);
  let ey: number, em: number;
  if (role.end === "present") {
    if (!now) return "";
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  } else {
    [ey, em] = parse(role.end);
  }
  const total = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, months && `${months} mo${months > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}
