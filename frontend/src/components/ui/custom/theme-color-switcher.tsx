"use client";

import { useEffect } from "react";
import { useConfig } from "@/hooks/config";

const themeClassRegex = /^theme.*/;

export function ThemeColorSwitcher() {
  const { theme } = useConfig();

  useEffect(() => {
    for (const className of document.body.classList) {
      if (className.match(themeClassRegex)) {
        document.body.classList.remove(className);
      }
    }

    if (theme) {
      return document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return null;
}
