type Schema = Record<string, unknown> | null;

/**
 * Renders a JSON-LD <script> tag from a schema.org object (or array of objects),
 * e.g. output from business-content.ts's buildLocalBusinessSchema()/buildFaqSchema().
 * Entries may be `null` (a builder skipping a still-placeholder client's schema, e.g.
 * `buildReviewSchema`) — those are filtered out, and the tag is omitted entirely if
 * nothing real is left. Server component — no client-side behavior needed.
 */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter((item): item is Record<string, unknown> => item !== null);
  if (items.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items) }}
    />
  );
}
