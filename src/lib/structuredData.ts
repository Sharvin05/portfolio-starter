import { connect, degree, interestsPage, profile, projects, roles, site, skillCategories, workIntro } from "@content";

/** A Schema.org node (JSON-LD), as search engines read it. */
export type JsonLdNode = { "@type": string; "@id"?: string } & Record<string, unknown>;

const base = `https://${site.domain}`;
const personId = `${base}/#person`;
const websiteId = `${base}/#website`;

/** You, as Schema.org sees you: name, role, current job, college, skills and profiles. */
export function personNode(): JsonLdNode {
  const current = roles.find((r) => r.end === "present");
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    jobTitle: current?.title ?? profile.role,
    url: base,
    image: `${base}/icon/512`,
    sameAs: connect.links.map((l) => l.href),
    ...(current && { worksFor: { "@type": "Organization", name: current.company, ...(current.url && { url: current.url }) } }),
    alumniOf: { "@type": "CollegeOrUniversity", name: degree.college.name, url: degree.college.url },
    knowsAbout: [...new Set(skillCategories.flatMap((c) => c.skills))],
  };
}

/** Home page: the site, you, and the projects in the Work section. */
export function homeGraph(): JsonLdNode[] {
  return [
    { "@type": "WebSite", "@id": websiteId, url: base, name: profile.name, description: site.description, inLanguage: site.language, publisher: { "@id": personId } },
    personNode(),
    { "@type": "ProfilePage", "@id": `${base}/#profile`, url: base, name: site.title, isPartOf: { "@id": websiteId }, mainEntity: { "@id": personId } },
    {
      "@type": "ItemList",
      "@id": `${base}/#work`,
      name: workIntro.kicker,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "CreativeWork", name: p.title, url: p.url, description: p.summary, creator: { "@id": personId } },
      })),
    },
  ];
}

/** Interests page: a page about you, with the person node so it stands on its own. */
export function interestsGraph(): JsonLdNode[] {
  return [
    personNode(),
    {
      "@type": "WebPage",
      "@id": `${base}/interests#page`,
      url: `${base}/interests`,
      name: interestsPage.meta.title,
      description: interestsPage.meta.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    },
  ];
}
