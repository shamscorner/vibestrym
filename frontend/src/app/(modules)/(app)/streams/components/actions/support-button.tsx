import { MedalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useAuth } from '@/app/(modules)/(auth)/hooks';
import { useCurrentAccount } from '@/app/(modules)/(auth)/hooks/current-account';
import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/tabs';
import {
  type FindChannelByUsernameQuery,
  useFindSponsorsByChannelQuery,
  useMakePaymentMutation,
} from '@/graphql/_generated/output';
import { convertPrice } from '@/utils/convert-price';

interface SupportButtonProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function SupportButton({ channel }: SupportButtonProps) {
  const t = useTranslations('streams.stream.actions.support');
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const { user, isLoadingProfile } = useCurrentAccount();

  const { data } = useFindSponsorsByChannelQuery({
    variables: {
      channelId: channel.id,
    },
  });
  const sponsors = data?.findSponsorsByChannel;

  const [makePayment, { loading: isLoadingMakePayment }] =
    useMakePaymentMutation({
      onCompleted(paymentData) {
        router.push(paymentData.makePayment.url);
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    });

  const isSponsor = sponsors?.some((sponsor) => sponsor.user.id === user?.id);
  const isOwnerChannel = user?.id === channel.id;

  if (isOwnerChannel || isLoadingProfile) {
    return null;
  }

  if (isSponsor) {
    return (
      <Button disabled variant="secondary">
        <MedalIcon className="size-4" />
        {t('alreadySponsor')}
      </Button>
    );
  }

  return isAuthenticated ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <MedalIcon className="size-4" />
          {t('supportAuthor')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue={channel.sponsorshipPlans[0].id}>
          <TabsList className="mb-1">
            {channel.sponsorshipPlans.map((plan, index) => (
              <TabsTrigger key={index} value={plan.id}>
                {plan.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {channel.sponsorshipPlans.map((plan, index) => (
            <TabsContent key={index} value={plan.id}>
              <DialogTitle className="text-2xl">
                {convertPrice(plan.price)}
              </DialogTitle>
              {plan.description && (
                <DialogDescription className="mt-2 text-sm">
                  {plan.description}
                </DialogDescription>
              )}
              <Button
                className="mt-3 w-full"
                disabled={isLoadingMakePayment}
                onClick={() =>
                  makePayment({
                    variables: { planId: plan.id },
                  })
                }
              >
                {t('choose')}
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  ) : (
    <Button onClick={() => router.push('/account/login')} variant="secondary">
      <MedalIcon className="size-4" />
      {t('supportAuthor')}
    </Button>
  );
}
