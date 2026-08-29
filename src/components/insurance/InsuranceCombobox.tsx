"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { insuranceProviders } from "@/data/insurance";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface InsuranceComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  disabled?: boolean;
}

export function InsuranceCombobox({ value, onChange, onBlur, hasError = false, disabled = false }: InsuranceComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (disabled) return;
    setOpen(next);
    if (!next) onBlur?.();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls="insurance-combobox-listbox"
          aria-required="true"
          aria-invalid={hasError}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors",
            hasError ? "border-destructive focus:border-destructive" : "border-input focus:border-primary",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">{value || "Search or select..."}</span>
          <ChevronDown size={16} className={cn("shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandInput placeholder="Search insurance providers..." />
          <CommandList id="insurance-combobox-listbox">
            <CommandEmpty>No providers match.</CommandEmpty>
            <CommandGroup>
              {insuranceProviders.map((provider) => (
                <CommandItem
                  key={provider.id}
                  value={provider.name}
                  onSelect={(selected) => {
                    onChange(selected);
                    setOpen(false);
                    onBlur?.();
                  }}
                >
                  <span className="truncate">{provider.name}</span>
                  {value === provider.name && <Check size={14} className="ml-auto shrink-0 text-primary" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
