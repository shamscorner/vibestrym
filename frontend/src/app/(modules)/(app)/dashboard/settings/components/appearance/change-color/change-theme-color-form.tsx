"use client";

import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { CardContainer } from "@/components/ui/custom/card-container";
import { BASE_COLORS } from "@/constants/colors.constants";
import { useConfig } from "@/hooks/config";

export function ChangeThemeColorForm() {
  const t = useTranslations("dashboard.settings.appearance.color");

  const config = useConfig();

  return (
    <CardContainer
      description={t("description")}
      heading={t("heading")}
      rightContent={
        <div className="grid min-w-[100px] grid-cols-4 gap-5 md:grid-cols-8">
          {BASE_COLORS.map((theme, index) => {
            const isActive = config.theme === theme.name;

            return (
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-background bg-(--theme-primary) hover:border-foreground"
                key={index}
                onClick={() => config.setTheme(theme.name)}
                style={
                  {
                    "--theme-primary": `${theme.color}`,
                  } as CSSProperties
                }
                title={theme.name.toUpperCase()}
                type="button"
              >
                {isActive && (
                  <CheckIcon className="size-5 text-background dark:text-foreground" />
                )}
              </button>
            );
          })}
        </div>
      }
    />
  );
}
