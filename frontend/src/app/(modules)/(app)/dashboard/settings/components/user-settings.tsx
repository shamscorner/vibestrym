import { useTranslations } from 'next-intl';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/tabs';
import { Heading } from '@/components/ui/custom/heading';
import { ChangeAvatarForm } from './profile/change-avatar/change-avatar-form';

export function UserSettings() {
  const t = useTranslations('dashboard.settings');

  return (
    <div className="lg:px-10">
      <Heading
        description={t('header.description')}
        size="lg"
        title={t('header.heading')}
      />
      <Tabs className="mt-6 w-full" defaultValue="profile">
        <TabsList className="grid max-w-2xl grid-cols-5">
          <TabsTrigger value="profile">{t('header.profile')}</TabsTrigger>
          <TabsTrigger value="account">{t('header.account')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('header.appearance')}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t('header.notifications')}
          </TabsTrigger>
          <TabsTrigger value="sessions">{t('header.sessions')}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Heading
            className="mt-5 flex flex-col gap-y-6"
            description={t('profile.header.description')}
            title={t('profile.header.heading')}
          />
          <div className='mt-5 flex flex-col gap-y-6'>
            <ChangeAvatarForm />
          </div>
        </TabsContent>
        <TabsContent value="account">Account</TabsContent>
        <TabsContent value="appearance">Appearance</TabsContent>
        <TabsContent value="notifications">Notifications</TabsContent>
        <TabsContent value="sessions">Sessions</TabsContent>
      </Tabs>
    </div>
  );
}
