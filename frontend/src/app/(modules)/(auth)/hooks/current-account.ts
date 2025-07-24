import { useEffect } from 'react';
import {
  useClearSessionCookieMutation,
  useFindProfileQuery,
} from '@/graphql/_generated/output';
import { useAuth } from '.';

export function useCurrentAccount() {
  const { isAuthenticated, exit } = useAuth();

  const { data, loading, refetch, error } = useFindProfileQuery({
    skip: !isAuthenticated,
  });
  const [clear] = useClearSessionCookieMutation();

  useEffect(() => {
    if (error && process.env.NODE_ENV === 'development') {
      // biome-ignore lint/suspicious/noConsole: <only for development>
      console.error('Error fetching current account:', error);
      return;
    }
    if (!error) return;
    if (isAuthenticated) {
      clear();
    }
    exit();
  }, [isAuthenticated, exit, clear, error]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}
