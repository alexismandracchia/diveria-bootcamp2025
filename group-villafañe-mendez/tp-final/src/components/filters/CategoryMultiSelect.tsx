"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaChevronDown, FaTags, FaCheck, FaTimes } from "react-icons/fa";
import Portal from "@/components/filters/common/Portal";

type Props = {
  label?: string;
  value: string[];
  options: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  maxHeight?: number; // px
};

type Rect = { top: number; left: number; width: number; height: number };

const CategoryMultiSelect: React.FC<Props> = ({
  label = "Categories",
  value,
  options,
  onChange,
  placeholder = "Categories",
  maxHeight = 280,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const selectedCount = value.length;
  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  const toggle = (opt: string) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  const selectAll = () => onChange(Array.from(new Set([...value, ...filtered])));
  const clearAll = () => onChange([]);

 
  const computePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setAnchorRect({ top: r.bottom + 8, left: r.left, width: r.width, height: r.height });
  };

  
  useLayoutEffect(() => {
    if (!open) return;
    computePosition();
    const onScrollOrResize = () => computePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open]);

  
  useEffect(() => {
    if (!open) return;
    const handleDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("mousedown", handleDown);
    return () => window.removeEventListener("mousedown", handleDown);
  }, [open]);

  return (
    <div className="w-full overflow-visible">
      <span className="text-[11px] uppercase tracking-wide text-dim">{label}</span>
      <div className="relative mt-1">
       
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((s) => !s)}
          className="group w-full rounded-2xl bg-white/5/50 backdrop-blur-md
                     border border-white/10 pl-11 pr-10 py-2.5 text-left text-sm text-strong
                     shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]
                     hover:border-white/20 focus:outline-none focus:ring-4 focus:ring-cyan-400/15 focus:border-cyan-400/30
                     transition-colors"
        >
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
            <FaTags className="h-4 w-4" />
          </span>

          <span className={`truncate ${selectedCount ? "" : "text-dim"}`}>
            {selectedCount
              ? `${selectedCount} categoría${selectedCount > 1 ? "s" : ""} seleccionada${selectedCount > 1 ? "s" : ""}`
              : placeholder}
          </span>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition-transform">
            <FaChevronDown className={`h-4 w-4 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

       
        {open && anchorRect && (
          <Portal>
            
            <div
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[998] bg-black/0"
            />

            <div
              ref={panelRef}
              role="listbox"
              aria-multiselectable="true"
              className="fixed z-[999] rounded-2xl border border-white/10
                         bg-gradient-to-b from-white/6 to-white/3 backdrop-blur-xl
                         shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              style={{
                top: anchorRect.top,
                left: anchorRect.left,
                width: anchorRect.width,
              }}
            >
              {/* Header: búsqueda + acciones */}
              <div className="p-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filtrar categorías…"
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-strong
                               placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                 
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-strong hover:border-white/20"
                  >
                    <FaTimes className="h-3 w-3" /> Limpiar
                  </button>
                </div>
              </div>

              {/* Lista */}
              <div
                className="max-h-[280px] overflow-auto scrollbar-thin p-2"
                style={{ maxHeight }}
              >
                {filtered.length === 0 ? (
                  <div className="px-2 py-6 text-center text-sm text-dim">Sin resultados</div>
                ) : (
                  <ul className="space-y-1">
                    {filtered.map((opt) => {
                      const checked = value.includes(opt);
                      return (
                        <li key={opt}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={checked}
                            onClick={() => toggle(opt)}
                            className={`w-full rounded-xl border px-3 py-2 text-sm flex items-center justify-between
                                       transition-colors ${
                                         checked
                                           ? "border-cyan-400/30 bg-cyan-400/10"
                                           : "border-white/10 bg-white/5 hover:border-white/20"
                                       }`}
                          >
                            <span className="truncate text-strong">{opt}</span>
                            {checked && <FaCheck className="h-4 w-4 opacity-90" aria-hidden />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-white/10 text-xs">
                <span className="text-dim">
                  {selectedCount
                    ? `${selectedCount} seleccionada${selectedCount > 1 ? "s" : ""}`
                    : "Ninguna seleccionada"}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:border-white/20"
                  aria-label="Cerrar lista de categorías"
                >
                  Listo
                </button>
              </div>
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
};

export default CategoryMultiSelect;
