"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { insuranceProviders } from "@/data/insurance";

interface InsuranceComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  disabled?: boolean;
}

export function InsuranceCombobox({ value, onChange, onBlur, hasError = false, disabled = false }: InsuranceComboboxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = insuranceProviders.filter(
    (p) => query === "" || p.name.toLowerCase().includes(query.toLowerCase())
  );

  const updatePos = useCallback(() => {
    if (inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }
  }, []);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    updatePos();
    setIsOpen(true);
  }, [disabled, updatePos]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
    onBlur?.();
  }, [onBlur]);

  const handleSelect = useCallback(
    (name: string) => {
      onChange(name);
      setQuery("");
      setIsOpen(false);
      setActiveIndex(-1);
      onBlur?.();
    },
    [onChange, onBlur]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) openDropdown();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) handleSelect(filtered[activeIndex].name);
        break;
      case "Escape":
        close();
        break;
      case "Tab":
        close();
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!inputRef.current?.contains(t) && !listRef.current?.contains(t)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [isOpen, updatePos]);

  const inputClass = [
    "w-full rounded-lg border bg-background px-3 py-2.5 pr-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors",
    hasError ? "border-destructive focus:border-destructive" : "border-input focus:border-primary",
  ].join(" ");

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="insurance-combobox-listbox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-activedescendant={activeIndex >= 0 ? `ins-opt-${activeIndex}` : undefined}
        value={isOpen ? query : value}
        placeholder="Search or select..."
        onChange={(e) => {
          setQuery(e.target.value);
          openDropdown();
          setActiveIndex(-1);
        }}
        onFocus={openDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        aria-required="true"
        aria-invalid={hasError}
        className={inputClass}
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={listRef}
            id="insurance-combobox-listbox"
            role="listbox"
            aria-label="Insurance providers"
            style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
            className="max-h-72 overflow-y-auto rounded-lg border border-border bg-popover py-1 shadow-xl"
          >
            {filtered.length === 0 ? (
              <li className="select-none px-4 py-3 text-sm text-muted-foreground">No providers match &ldquo;{query}&rdquo;</li>
            ) : (
              filtered.map((provider, i) => (
                <li
                  key={provider.id}
                  id={`ins-opt-${i}`}
                  role="option"
                  aria-selected={value === provider.name}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(provider.name);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={[
                    "flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors",
                    i === activeIndex ? "bg-accent text-accent-foreground" : value === provider.name ? "bg-muted" : "text-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  <span className="truncate">{provider.name}</span>
                  {value === provider.name && <Check size={14} className="shrink-0 text-primary" />}
                </li>
              ))
            )}
          </ul>,
          document.body
        )}
    </div>
  );
}
