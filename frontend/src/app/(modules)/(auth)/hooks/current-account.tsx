import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { graphql } from "@/gql";
import { useAuth } from ".";

const FindProfileDoc = graphql(`
query FindProfile {
  findProfile {
    id
    username
    displayName
    email
    avatar
    bio
    isVerified
    isTotpEnabled
    notificationSettings {
      siteNotifications
      telegramNotifications
    }
    stream {
      serverUrl
      streamKey
      isChatEnabled
      isChatFollowersOnly
      isChatPremiumFollowersOnly
    }
  }
}
`);

const ClearSessionCookieDoc = graphql(`
mutation ClearSessionCookie {
  clearSessionCookie
}
`);

export function useCurrentAccount() {
  const { isAuthenticated, exit } = useAuth();

  const { data, loading, refetch, error } = useQuery(FindProfileDoc, {
    skip: !isAuthenticated,
  });

  const [clear] = useMutation(ClearSessionCookieDoc);

  useEffect(() => {
    // if (error && process.env.NODE_ENV === 'development') {
    //   // biome-ignore lint/suspicious/noConsole: <only for development>
    //   console.error('Error fetching current account:', error);
    //   return;
    // }
    if (!error) return;
    if (isAuthenticated) {
      clear();
    }
    exit();
  }, [isAuthenticated, exit, error, clear]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}
