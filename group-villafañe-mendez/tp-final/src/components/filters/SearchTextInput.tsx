"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchTextInput: React.FC<Props> = ({
  label = "Search",
  placeholder = "Products",
  value,
  onChange,
}) => {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-dim">{label}</span>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
          <FaSearch className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-white/5/50 backdrop-blur-md border border-white/10
                     pl-10 pr-3 py-2.5 text-sm text-strong placeholder:text-dim
                     shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] 
                     focus:outline-none focus:ring-4 focus:ring-cyan-400/15 focus:border-cyan-400/30
                     hover:border-white/20 transition-colors"
          aria-label={label}
        />
      </div>
    </label>
  );
};

export default SearchTextInput;
