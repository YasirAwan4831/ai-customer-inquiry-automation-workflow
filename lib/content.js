import document from "@/content/document.json";

export const sections = document;
export const getSection = (slug) => sections.find((s) => s.id === slug);
export const sectionLabel = (s) => `${s.number}. ${s.title}`;
export function neighbours(slug) {
  const i = sections.findIndex((s) => s.id === slug);
  return { prev: sections[i - 1] || null, next: sections[i + 1] || null };
}
export const headings = (section) => section.blocks.filter((b) => b.type === "h2");
const byNumber = (n) => sections.find((s) => s.number === String(n));
const qaOf = (s) => s.blocks.filter((b) => b.type === "qa");

/** Section 7: five customer questions with their AI responses (h2 gives the title). */
export function responses() {
  const s = byNumber(7);
  const out = [];
  s.blocks.forEach((b, i) => { if (b.type === "h2" && s.blocks[i + 1]?.type === "qa") out.push({ id: b.id, number: b.number, title: b.text, rows: s.blocks[i + 1].rows }); });
  return out;
}
/** Sections 10-12: three testing scenarios. */
export function scenarios() {
  return [10, 11, 12].map((n) => { const s = byNumber(n); return { id: s.id, number: s.number, title: s.title, intro: s.blocks.find((b) => b.type === "p")?.text, rows: qaOf(s)[0].rows }; });
}
export const section = byNumber;
export function searchIndex() {
  const entries = [];
  const text = (b) => (b.rows ? b.rows.flat().join(" ") : b.steps ? b.steps.join(" ") : [b.title, b.text, ...(b.items || [])].filter(Boolean).join(" "));
  sections.forEach((s) => {
    let current = { anchor: "", heading: s.title, parts: [] };
    const push = () => current.parts.length && entries.push({ slug: s.id, anchor: current.anchor, sectionTitle: sectionLabel(s), heading: current.heading, text: current.parts.join(" ") });
    s.blocks.forEach((b) => {
      if (b.type === "h2") { push(); current = { anchor: b.id, heading: `${b.number} ${b.text}`, parts: [] }; }
      else current.parts.push(text(b));
    });
    push();
  });
  return entries;
}
