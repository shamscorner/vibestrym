import { useMutation } from "@apollo/client/react";
import { captureException } from "@sentry/nextjs";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid4 } from "uuid";
import { useAuth } from "@/app/(modules)/(auth)/hooks";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { graphql } from "@/gql";
import type { GenerateStreamTokenModel } from "@/gql/graphql";

const GenerateStreamTokenDoc = graphql(`
mutation GenerateStreamToken($data: GenerateStreamTokenInput!) {
  generateStreamToken(data: $data) {
    token
  }
}
`);

export function useStreamToken(channelId: string) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  const { isAuthenticated } = useAuth();
  const { user } = useCurrentAccount();

  const [generateStreamToken] = useMutation(GenerateStreamTokenDoc);

  const onCompleted = (data?: GenerateStreamTokenModel) => {
    const viewerToken = data?.token || "";

    setToken(viewerToken);

    const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
      name?: string;
    };

    const tokenName = decodedToken.name;
    const tokenIdentity = decodedToken.sub;

    if (tokenName) {
      setName(tokenName);
    }

    if (tokenIdentity) {
      setIdentity(tokenIdentity);
    }
  };

  const onError = (error: Error) => {
    captureException(error, {
      extra: {
        module: "useStreamToken",
        action: "generateStreamToken",
      },
    });
    toast.error(error.message);
  };

  useEffect(() => {
    async function generateToken() {
      const userId = isAuthenticated && user ? user.id : uuid4();

      const { data: streamTokenData, error } = await generateStreamToken({
        variables: {
          data: {
            userId,
            channelId,
          },
        },
      });

      if (error) {
        onError(error);
        return;
      }

      onCompleted(streamTokenData?.generateStreamToken);
    }

    const timeoutId = setTimeout(generateToken, 1000);

    return () => clearTimeout(timeoutId);
  }, [generateStreamToken, isAuthenticated, user, channelId]);

  return { token, name, identity };
}
