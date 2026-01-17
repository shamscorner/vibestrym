import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/nextjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Button } from "@/components/ui/common/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/common/input-otp";
import { graphql } from "@/gql";
import { type EnableTotpSchema, enableTotpSchema } from "./enable-totp.schema";

const GenerateTotpSecretDoc = graphql(`
query GenerateTotpSecret {
  generateTotpSecret {
    qrcodeUrl
    secret
  }
}
`);

const EnableTotpDoc = graphql(`
mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data)
}
`);

export function EnableTotp() {
  const t = useTranslations("dashboard.settings.account.twoFactor.enable");

  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useCurrentAccount();

  const { data, loading: isLoadingGenerate } = useQuery(GenerateTotpSecretDoc);
  const twoFactorAuth = data?.generateTotpSecret;

  const form = useForm<EnableTotpSchema>({
    resolver: zodResolver(enableTotpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [enable, { loading: isLoadingEnable }] = useMutation(EnableTotpDoc, {
    onCompleted() {
      refetch();
      setIsOpen(false);
      toast.success(t("successMessage"));
    },
    onError(error) {
      captureException(error, {
        extra: {
          action: "Enable TOTP",
          pin: form.getValues("pin"),
        },
      });
      toast.error(error.message || t("errorMessage"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(value: EnableTotpSchema) {
    enable({
      variables: {
        data: {
          secret: twoFactorAuth?.secret ?? "",
          pin: value.pin,
        },
      },
    });
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>{t("trigger")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("heading")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="mt-4 flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-muted-foreground text-sm">
                {twoFactorAuth?.qrcodeUrl ? t("qrInstructions") : ""}
              </span>
              {twoFactorAuth?.qrcodeUrl && (
                <Image
                  alt="QR Code"
                  className="rounded-lg"
                  height={128}
                  src={twoFactorAuth?.qrcodeUrl}
                  width={128}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-center text-muted-foreground text-sm">
                {twoFactorAuth?.secret
                  ? t("secretCodeLabel") + twoFactorAuth.secret
                  : ""}
              </span>
            </div>
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="mt-3 flex flex-col gap-3">
                  <FormLabel>{t("pin.label")}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t("pin.description")}</FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                disabled={!isValid || isLoadingGenerate || isLoadingEnable}
                type="submit"
              >
                {t("submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
