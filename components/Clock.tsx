"use client";

import { useEffect, useState } from "react";

export const Clock = () => {
  const [datetime, setDatetime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDatetime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-white text-4xl" suppressHydrationWarning>
        {datetime.toLocaleTimeString()}
      </span>
      <span className="text-white text-2xl" suppressHydrationWarning>
        {datetime.toLocaleDateString()}
      </span>
    </div>
  );
};
