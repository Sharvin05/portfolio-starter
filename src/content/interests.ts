import { profile } from "./profile";
import type { InterestsPage, InterestsTeaser } from "./types";

/**
 * The /interests page and its card on the home page.
 * To add a photo, put it in src/content/assets and import it:
 *   import trail from "./assets/trail.jpg";
 *   photo: { image: trail, alt: "A forest trail at dawn", credit: "Photographer, CC BY 2.0" }
 * Credits are listed once in the footer.
 */
export const interestsPage: InterestsPage = {
  meta: {
    title: `Interests — ${profile.name}`,
    description: `Hiking, football, games and photography: what ${profile.name} is into away from code.`,
  },
  intro: {
    kicker: "Interests",
    title: [{ text: "When I'm Not" }, { text: "Shipping Code.", highlight: true }],
    lede: "Trails at the weekend, football on the big screen, and a backlog of games I'll finish one day.",
  },
  driving: {
    kicker: "Outdoors",
    title: [{ text: "Off the Screen," }, { text: "Out the Door.", highlight: true }],
    lede: "The best ideas tend to show up halfway up a hill.",
    columns: [
      { label: "On foot", items: ["Day hikes", "Coastal paths"] },
      { label: "On wheels", items: ["Gravel rides", "Weekend road trips"] },
    ],
  },
  sports: {
    kicker: "Sports",
    title: [{ text: "What I" }, { text: "Follow.", highlight: true }],
    lede: "The sports I keep up with.",
    items: [
      { id: "football", title: "Football", detail: "Matchdays and the late goals that decide them." },
      { id: "tennis", title: "Tennis", detail: "The Grand Slams, start to finish." },
      { id: "cycling", title: "Cycling", detail: "The big tours, especially the mountain stages." },
    ],
  },
  games: {
    kicker: "Gaming",
    title: [{ text: "What I'm" }, { text: "Playing.", highlight: true }],
    lede: "A mix of cosy games and fast ones.",
    items: [
      { title: "Stardew Valley", genre: "Farming sim" },
      { title: "Mario Kart 8", genre: "Racing" },
      { title: "Hades", genre: "Roguelike" },
      { title: "Celeste", genre: "Platformer" },
    ],
  },
  loves: {
    kicker: "Things I Love",
    title: [{ text: "Small Things," }, { text: "Big Views.", highlight: true }],
    lede: "What I'd talk about for hours.",
    items: [
      { id: "photography", title: "Photography", detail: "Film cameras and early mornings." },
      { id: "coffee", title: "Coffee", detail: "Slow brews and new roasters." },
      { id: "books", title: "Books", detail: "Sci-fi, mostly." },
    ],
  },
  close: {
    kicker: "Say Hi",
    title: [{ text: "Know a Good" }, { text: "Trail?", highlight: true }],
    lede: "Send it over, along with any project you have in mind.",
  },
};

export const interestsTeaser: InterestsTeaser = {
  kicker: "Off the Clock",
  title: [{ text: "Trails, Football and" }, { text: "Good Games.", highlight: true }],
  lede: "What I'm into when I'm not building: the sports I follow, the games I play, and where I go to switch off.",
  tags: ["Hiking", "Football", "Games", "Photography"],
  cta: { label: "See My Interests", href: "/interests" },
};
