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
  FormMessage,
} from "@/components/ui/common/form";
import { Input } from "@/components/ui/common/input";
import { Skeleton } from "@/components/ui/common/skeleton";
import { FormWrapper } from "@/components/ui/custom/form-wrapper";
import { graphql } from "@/gql";
import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from "./change-password.schema";

const ChangePasswordDoc = graphql(`
mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
`);

export function ChangePasswordForm() {
  const t = useTranslations("dashboard.settings.account.password");

  const { isLoadingProfile, refetch } = useCurrentAccount();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useMutation(
    ChangePasswordDoc,
    {
      onCompleted() {
        form.reset();
        refetch();
        toast.success(t("successMessage"));
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    }
  );

  const { isValid } = form.formState;

  function onSubmit(data: ChangePasswordSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangePasswordFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form className="grid gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("oldPassword.label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingUpdate}
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("oldPassword.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("newPassword.label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingUpdate}
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("newPassword.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end p-5">
            <Button disabled={!isValid || isLoadingUpdate}>
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangePasswordFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
