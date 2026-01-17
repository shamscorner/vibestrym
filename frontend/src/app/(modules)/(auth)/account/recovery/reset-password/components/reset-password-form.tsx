"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/nextjs";
import { CircleCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/common/alert";
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
import { graphql } from "@/gql";
import { cn } from "@/utils/tw-merge";
import {
  type ResetPasswordSchema,
  resetPasswordSchema,
} from "../reset-password.schema";

const ResetPasswordDoc = graphql(`
mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
`);

export function ResetPasswordForm({
  className,
  ...props
}: ComponentProps<"form">) {
  const t = useTranslations("auth.resetPassword");

  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [resetPassword, { loading: isLoadingResetPassword }] = useMutation(
    ResetPasswordDoc,
    {
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: (error) => {
        setIsSuccess(false);
        toast.error(error.message || t("errorMessage"));
        captureException(error, {
          extra: {
            action: "reset-password",
            variables: form.getValues(),
          },
        });
      },
    }
  );

  function onSubmit(values: ResetPasswordSchema) {
    resetPassword({
      variables: { data: values },
    });
  }

  return isSuccess ? (
    <Alert>
      <CircleCheckIcon className="size-4" />
      <AlertTitle>{t("successAlert.title")}</AlertTitle>
      <AlertDescription>{t("successAlert.description")}</AlertDescription>
    </Alert>
  ) : (
    <Form {...form}>
      <form
        {...props}
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-2xl">{t("heading")}</h1>
          <p className="text-balance text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoadingResetPassword}
                    placeholder="mail@vibestrym.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("email.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-4 w-full"
            disabled={isSubmitting || !isValid || isLoadingResetPassword}
            type="submit"
          >
            {t("submitButton")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
