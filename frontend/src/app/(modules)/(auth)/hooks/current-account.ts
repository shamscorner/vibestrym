import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFindProfileQuery } from '@/graphql/_generated/output';
import { useAuth } from '.';

export function useCurrentAccount() {
  const router = useRouter();
  const { isAuthenticated, exit } = useAuth();

  const { data, loading, refetch, error } = useFindProfileQuery({
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (error && process.env.NODE_ENV === 'development') {
      // biome-ignore lint/suspicious/noConsole: <only for development>
      console.error('Error fetching current account:', error);
      return;
    }
    if (!error) return;
    if (isAuthenticated) {
      router.push('/logout');
      return;
    }
    exit();
  }, [isAuthenticated, exit, error, router.push]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}
