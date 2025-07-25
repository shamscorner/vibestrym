import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { CardContainer } from '@/components/ui/custom/card-container';

import {
  type FindSessionsByUserQuery,
  useFindSessionsByUserQuery,
  useRemoveSessionMutation,
} from '@/graphql/_generated/output';
import { useConfirmDialog } from '@/hooks/confirm-dialog';
import { SessionModal } from './session-dialog';
import { getBrowserIcon } from './utils/get-browser-icon';

interface SessionItemProps {
  session: FindSessionsByUserQuery['findSessionsByUser'][0];
  isCurrentSession?: boolean;
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
  const t = useTranslations('dashboard.settings.sessions.sessionItem');
  const { confirm: confirmDelete } = useConfirmDialog();

  const { refetch } = useFindSessionsByUserQuery();

  const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
    onCompleted() {
      refetch();
      toast.success(t('successMessage'));
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  const Icon = getBrowserIcon(session.metadata.device.browser);

  return (
    <CardContainer
      description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
      heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
      Icon={Icon}
      rightContent={
        <div className="flex items-center gap-x-4">
          {!isCurrentSession && (
            <Button
              disabled={isLoadingRemove}
              onClick={async () =>
                await confirmDelete({
                  title: t('confirmDialog.heading'),
                  description: t('confirmDialog.message'),
                  actionType: 'destructive',
                  action: async () => {
                    await remove({ variables: { id: session.id } });
                    return true;
                  },
                })
              }
              variant="destructive"
            >
              {t('deleteButton')}
            </Button>
          )}
          <SessionModal session={session}>
            <Button>{t('detailsButton')}</Button>
          </SessionModal>
        </div>
      }
    />
  );
}
