"use client";

import { useMutation } from "@apollo/client/react";
import { captureException } from "@sentry/nextjs";
import { Loader2Icon, OctagonXIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/common/alert";
import { Button } from "@/components/ui/common/button";
import { graphql } from "../../../../../../gql";
import { useAuth } from "../../../hooks";

const VerifyAccountDoc = graphql(`
mutation VerifyAccount($data: VerificationInput!) {
  verifyAccount(data: $data) {
    message
    user {
      email
      isEmailVerified
    }
  }
}
`);

export function VerifyAccountForm() {
  const t = useTranslations("auth.verify");

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const { auth } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const [verifyAccount] = useMutation(VerifyAccountDoc, {
    onCompleted() {
      auth();
      setErrorMessage("");
      toast.success(t("successMessage"));
      router.push("/dashboard/settings");
    },
    onError(error) {
      const errMessage = error.message || t("errorMessage");
      setErrorMessage(errMessage);
      captureException(error, {
        extra: {
          action: "verify-account",
          variables: { token },
        },
      });
    },
  });

  useEffect(() => {
    verifyAccount({
      variables: {
        data: { token },
      },
    });
  }, [token, verifyAccount]);

  return errorMessage ? (
    <Alert>
      <OctagonXIcon className="size-4" />
      <AlertTitle>{t("errorAlert.title")}</AlertTitle>
      <AlertDescription>
        <p>{errorMessage || t("errorAlert.description")}</p>
        <Button asChild className="mt-5 w-full">
          <Link href="/account/login">{t("loginAgain")}</Link>
        </Button>
      </AlertDescription>
    </Alert>
  ) : (
    <div className="flex items-center justify-center">
      <Loader2Icon className="size-8 animate-spin" />
    </div>
  );
}
