"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { MegaMenuConfig } from "@/data/megaMenus";

// Desktop flyout content, rendered inside a NavigationMenuItem's <NavigationMenuContent>.
export function MegaMenuDesktop({ config }: { config: MegaMenuConfig }) {
  const singleCategory = config.categories.length === 1;

  return (
    <NavigationMenuContent>
      <div className={cn("grid gap-4 p-4", singleCategory ? "w-[280px]" : "w-[560px] grid-cols-2")}>
        {config.categories.map((category) => (
          <div key={category.title} className="min-w-0">
            {!singleCategory && (
              <p className="mb-1.5 truncate text-[11px] font-bold tracking-widest text-muted-foreground uppercase">{category.title}</p>
            )}
            <ul className="grid gap-1">
              {category.items.map((item) => (
                <li key={item.href} className="min-w-0">
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="block min-w-0 rounded-md px-2 py-1.5 break-words hover:bg-accent">
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={cn(!singleCategory && "col-span-2 border-t border-border pt-2")}>
          <NavigationMenuLink asChild>
            <Link href={config.viewAllHref} className="flex items-center justify-between rounded-md px-2 py-1.5 font-semibold text-primary">
              {config.viewAllLabel} <ArrowUpRight size={14} />
            </Link>
          </NavigationMenuLink>
        </div>
      </div>
    </NavigationMenuContent>
  );
}

// Mobile drawer content — a Collapsible with the same category/item data.
export function MegaMenuMobile({
  label,
  config,
  open,
  onOpenChange,
  active,
}: {
  label: string;
  config: MegaMenuConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  active: boolean;
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-accent",
          active && "text-primary"
        )}
      >
        {label}
        <ChevronDown size={18} className={cn("transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1 py-1 pl-4">
        {config.categories.map((category) => (
          <div key={category.title} className="min-w-0">
            {config.categories.length > 1 && (
              <p className="mt-2 mb-1 truncate px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{category.title}</p>
            )}
            {category.items.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <span className="min-w-0 break-words">{item.title}</span>
                  <ArrowUpRight size={15} className="shrink-0" />
                </Link>
              </SheetClose>
            ))}
          </div>
        ))}
        <SheetClose asChild>
          <Link href={config.viewAllHref} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-primary">
            {config.viewAllLabel} <ArrowUpRight size={15} />
          </Link>
        </SheetClose>
      </CollapsibleContent>
    </Collapsible>
  );
}
