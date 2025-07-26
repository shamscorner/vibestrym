import { Heart, HeartOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useAuth } from '@/app/(modules)/(auth)/hooks';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Button } from '@/components/ui/common/button';
import {
  type FindChannelByUsernameQuery,
  useFindMyFollowingsQuery,
  useFollowChannelMutation,
  useUnfollowChannelMutation,
} from '@/graphql/_generated/output';
import { useConfirmDialog } from '@/hooks/confirm-dialog';

interface FollowButtonProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function FollowButton({ channel }: FollowButtonProps) {
  const t = useTranslations('streams.stream.actions.follow');
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const { user, isLoadingProfile } = useCurrentAccount();
  const { confirm: confirmUnfollow } = useConfirmDialog();

  const {
    data,
    loading: isLoadingFollowings,
    refetch,
  } = useFindMyFollowingsQuery({
    skip: !isAuthenticated,
  });
  const followings = data?.findMyFollowings;

  const [follow, { loading: isLoadingFollow }] = useFollowChannelMutation({
    onCompleted() {
      refetch();
      toast.success(t('followMessage.success', { channelName: channel.username }));
    },
    onError() {
      toast.error(t('followMessage.error'));
    },
  });

  const [unfollow, { loading: isLoadingUnfollow }] = useUnfollowChannelMutation(
    {
      onCompleted() {
        refetch();
        toast.success(t('unfollowMessage.success', { channelName: channel.username }));
      },
      onError() {
        toast.error(t('unfollowMessage.error'));
      },
    }
  );

  const isOwnerChannel = user?.id === channel.id;
  const isExistingFollow = followings?.some(
    (following) => following.followingId === channel.id
  );

  if (isOwnerChannel || isLoadingProfile) {
    return null;
  }

  return isExistingFollow ? (
    <Button disabled={isLoadingFollowings || isLoadingUnfollow} onClick={async () =>
      await confirmUnfollow({
        title: t('unfollowDialog.heading'),
        description: t('unfollowDialog.message'),
        actionType: 'destructive',
        action: async () => {
          await unfollow({ variables: { channelId: channel.id } })
          return true;
        },
      })
    }>
      <HeartOff className="size-4" />
      <span>{t('unfollowButton')}</span>
    </Button>
  ) : (
    <Button
      disabled={isLoadingFollowings || isLoadingFollow}
      onClick={() =>
        isAuthenticated
          ? follow({ variables: { channelId: channel.id } })
          : router.push('/account/login')
      }
    >
      <Heart className="size-4" />
      {t('followButton')}
    </Button>
  );
}
