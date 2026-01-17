"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormField } from "@/components/ui/common/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/common/select";
import { CardContainer } from "@/components/ui/custom/card-container";
import { setLanguage } from "@/libs/i18n/language";
import {
  type ChangeLanguageSchema,
  changeLanguageSchema,
} from "./change-language.schema";

const languages = {
  en: "English",
  bn: "বাংলা",
};

export function ChangeLanguageForm() {
  const t = useTranslations("dashboard.settings.appearance.language");

  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const form = useForm<ChangeLanguageSchema>({
    resolver: zodResolver(changeLanguageSchema),
    values: {
      language: locale as ChangeLanguageSchema["language"],
    },
  });

  function onSubmit(data: ChangeLanguageSchema) {
    startTransition(async () => {
      try {
        await setLanguage(data.language);
      } catch {
        toast.success(t("successMessage"));
      }
    });
  }

  return (
    <CardContainer
      description={t("description")}
      heading={t("heading")}
      rightContent={
        <Form {...form}>
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                value={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([code, name]) => (
                    <SelectItem disabled={isPending} key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Form>
      }
    />
  );
}
