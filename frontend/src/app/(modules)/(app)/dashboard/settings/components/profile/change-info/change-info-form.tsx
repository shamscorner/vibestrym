"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Button } from "@/components/ui/common/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/form";
import { Input } from "@/components/ui/common/input";
import { Skeleton } from "@/components/ui/common/skeleton";
import { Textarea } from "@/components/ui/common/textarea";
import { FormWrapper } from "@/components/ui/custom/form-wrapper";
import { graphql } from "@/gql";
import { type ChangeInfoSchema, changeInfoSchema } from "./change-info.schema";

const ChangeProfileInfoDoc = graphql(`
mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $data)
}
`);

export function ChangeInfoForm() {
  const t = useTranslations("dashboard.settings.profile.info");

  const { user, isLoadingProfile, refetch } = useCurrentAccount();

  const form = useForm<ChangeInfoSchema>({
    resolver: zodResolver(changeInfoSchema),
    values: {
      username: user?.username ?? "",
      displayName: user?.displayName ?? "",
      bio: user?.bio ?? "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useMutation(
    ChangeProfileInfoDoc,
    {
      onCompleted() {
        refetch();
        toast.success(t("successMessage"));
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    }
  );

  const { isValid, isDirty } = form.formState;

  function onSubmit(data: ChangeInfoSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangeInfoFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form className="grid gap-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("username.label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingUpdate}
                    placeholder={t("username.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("username.description")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t("displayName.label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingUpdate}
                    placeholder={t("displayName.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("displayName.description")}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t("bio.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoadingUpdate}
                    placeholder={t("bio.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("bio.description")}</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end p-5">
            <Button disabled={!(isValid && isDirty) || isLoadingUpdate}>
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeInfoFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
