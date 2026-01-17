"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form, FormField } from "@/components/ui/common/form";
import { ToggleCard } from "@/components/ui/custom/toggle-card";

import {
  type ChangeThemeSchema,
  changeThemeSchema,
} from "./change-theme.schema";

export function ChangeThemeForm() {
  const t = useTranslations("dashboard.settings.appearance.theme");

  const { theme, setTheme } = useTheme();

  const form = useForm<ChangeThemeSchema>({
    resolver: zodResolver(changeThemeSchema),
    values: {
      theme: theme === "dark" ? "dark" : "light",
    },
  });

  function onChange(value: boolean) {
    const newTheme = value ? "dark" : "light";

    setTheme(newTheme);
    form.setValue("theme", newTheme);
    toast.success(t("successMessage", { theme: newTheme.toUpperCase() }));
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="theme"
        render={({ field }) => (
          <ToggleCard
            description={t("description")}
            heading={t("heading")}
            onChange={onChange}
            value={field.value === "dark"}
          />
        )}
      />
    </Form>
  );
}
