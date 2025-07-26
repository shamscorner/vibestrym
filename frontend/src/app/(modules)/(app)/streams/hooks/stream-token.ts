import { captureException } from '@sentry/nextjs';
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from '@/app/(modules)/(auth)/hooks';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { useGenerateStreamTokenMutation } from '@/graphql/_generated/output';

export function useStreamToken(channelId: string) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  const { isAuthenticated } = useAuth();
  const { user } = useCurrentAccount();

  const [generateStreamToken] = useGenerateStreamTokenMutation({
    onCompleted(data) {
      const viewerToken = data.generateStreamToken.token;

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
    },
    onError(error) {
      captureException(error, {
        extra: {
          module: 'useStreamToken',
          action: 'generateStreamToken',
        },
      });
      toast.error(error.message);
    },
  });

  useEffect(() => {
    async function generateToken() {
      const userId = isAuthenticated && user ? user.id : uuid4();

      await generateStreamToken({
        variables: {
          data: {
            userId,
            channelId,
          },
        },
      });
    }

    const timeoutId = setTimeout(generateToken, 1000);

    return () => clearTimeout(timeoutId);
  }, [generateStreamToken, isAuthenticated, user, channelId]);

  return { token, name, identity };
}
