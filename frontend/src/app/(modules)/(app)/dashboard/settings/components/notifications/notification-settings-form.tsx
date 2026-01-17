"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Form, FormField } from "@/components/ui/common/form";
import {
  ToggleCard,
  ToggleCardSkeleton,
} from "@/components/ui/custom/toggle-card";
import { graphql } from "@/gql";
import {
  type ChangeNotificationsSettingsSchema,
  changeNotificationsSettingsSchema,
} from "./change-notifications-settings.schema";

const ChangeNotificationsSettingsDoc = graphql(`
mutation ChangeNotificationsSettings($data: ChangeNotificationsSettingsInput!) {
  changeNotificationsSettings(data: $data) {
    notificationSettings {
      siteNotifications
      telegramNotifications
    }
    telegramAuthToken
  }
}
`);

export function ChangeNotificationsSettingsForm() {
  const t = useTranslations("dashboard.settings.notifications");

  const { user, isLoadingProfile, refetch } = useCurrentAccount();

  const form = useForm<ChangeNotificationsSettingsSchema>({
    resolver: zodResolver(changeNotificationsSettingsSchema),
    values: {
      siteNotifications: user?.notificationSettings.siteNotifications ?? false,
      telegramNotifications:
        user?.notificationSettings.telegramNotifications ?? false,
    },
  });

  const [update, { loading: isLoadingUpdate }] = useMutation(
    ChangeNotificationsSettingsDoc,
    {
      onCompleted(data) {
        refetch();
        toast.success(t("successMessage"));

        if (data.changeNotificationsSettings.telegramAuthToken) {
          const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME;
          window.open(
            `https://t.me/${botName}?start=${data.changeNotificationsSettings.telegramAuthToken}`,
            "_blank"
          );
        }
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    }
  );

  function onChange(
    field: keyof ChangeNotificationsSettingsSchema,
    value: boolean
  ) {
    form.setValue(field, value);

    update({
      variables: {
        data: { ...form.getValues(), [field]: value },
      },
    });
  }

  return isLoadingProfile ? (
    Array.from({ length: 2 }).map((_, index) => (
      <ToggleCardSkeleton key={index} />
    ))
  ) : (
    <Form {...form}>
      <FormField
        control={form.control}
        name="siteNotifications"
        render={({ field }) => (
          <ToggleCard
            description={t("siteNotifications.description")}
            heading={t("siteNotifications.heading")}
            isDisabled={isLoadingUpdate}
            onChange={(value) => onChange("siteNotifications", value)}
            value={field.value}
          />
        )}
      />
      <FormField
        control={form.control}
        name="telegramNotifications"
        render={({ field }) => (
          <ToggleCard
            description={t("telegramNotifications.description")}
            heading={t("telegramNotifications.heading")}
            isDisabled={isLoadingUpdate}
            onChange={(value) => onChange("telegramNotifications", value)}
            value={field.value}
          />
        )}
      />
    </Form>
  );
}
