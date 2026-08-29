/**
 * Renders a JSON-LD <script> tag from a schema.org object (or array of objects),
 * e.g. output from business-content.ts's buildLocalBusinessSchema()/buildFaqSchema().
 * Server component — no client-side behavior needed.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
