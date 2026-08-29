import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake/IntakeForm";

export const metadata: Metadata = {
  title: "Get Started — Request Your Clone",
  description: "Tell us about your business and we'll set up your own copy of this site.",
};

export default function GetStartedPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Get Started</h1>
        <p className="mt-3 text-muted-foreground">
          Tell us about your business and we&apos;ll get your own version of this site set up for you.
        </p>
      </div>
      <IntakeForm />
    </main>
  );
}
