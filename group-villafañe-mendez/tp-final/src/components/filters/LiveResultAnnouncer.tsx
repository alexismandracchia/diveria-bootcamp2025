"use client";
import React from "react";

type Props = {
  count: number;
  active: boolean;
};

const LiveResultsAnnouncer: React.FC<Props> = ({ count, active }) => {
  const message = active ? `${count} resultados` : "";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

export default LiveResultsAnnouncer;
