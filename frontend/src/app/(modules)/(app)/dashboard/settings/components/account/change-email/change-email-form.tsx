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
import { FormWrapper } from "@/components/ui/custom/form-wrapper";
import { graphql } from "../../../../../../../../gql";
import {
  type ChangeEmailSchema,
  changeEmailSchema,
} from "./change-email.schema";

const ChangeEmailDoc = graphql(`
mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data)
}
`);

export function ChangeEmailForm() {
  const t = useTranslations("dashboard.settings.account.email");

  const { user, isLoadingProfile, refetch } = useCurrentAccount();

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    values: {
      email: user?.email ?? "",
    },
  });

  const [update, { loading: isLoadingUpdate }] = useMutation(ChangeEmailDoc, {
    onCompleted() {
      refetch();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid, isDirty } = form.formState;

  function onSubmit(data: ChangeEmailSchema) {
    update({ variables: { data } });
  }

  return isLoadingProfile ? (
    <ChangeEmailFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form className="grid gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingUpdate}
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("description")}</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end px-5">
            <Button disabled={!(isValid && isDirty) || isLoadingUpdate}>
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeEmailFormSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}
