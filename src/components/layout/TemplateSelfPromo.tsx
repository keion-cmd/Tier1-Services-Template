/**
 * Self-promotional strip for the TEMPLATE's own demo/marketing site — advertises that the
 * site is a customizable service-business template and links to /get-started. Not for clones:
 * rendered only when `businessConfig.isTemplateDemo` is true, which must never be set on a
 * real client clone. See CLONE_INSTRUCTIONS.md.
 */
import Link from "next/link";
import { clinic } from "@/lib/business-content";

export function TemplateSelfPromo() {
  return (
    <div className="flex min-w-0 flex-col gap-2 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
      <span className="min-w-0 break-words">{clinic.name} is a customizable service-business template.</span>
      <span className="min-w-0 break-words">
        Want a site like this for your business?{" "}
        <Link href="/get-started" className="underline underline-offset-4 hover:text-background/80">
          Get started
        </Link>
      </span>
    </div>
  );
}
