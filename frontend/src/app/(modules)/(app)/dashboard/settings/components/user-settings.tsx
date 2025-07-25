import { useTranslations } from 'next-intl';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/tabs';
import { Heading } from '@/components/ui/custom/heading';
import { ChangeEmailForm } from './account/change-email/change-email-form';
import { ChangePasswordForm } from './account/change-password/change-password-form';
import { DeactivateAccount } from './account/deactivate-account/deactivate-account';
import { WrapperTotp } from './account/totp/wrapper-totp';
import { ChangeThemeColorForm } from './appearance/change-color/change-theme-color-form';
import { ChangeLanguageForm } from './appearance/change-language/change-language-form';
import { ChangeThemeForm } from './appearance/change-theme/change-theme-form';
import { ChangeNotificationsSettingsForm } from './notifications/notification-settings-form';
import { ChangeAvatarForm } from './profile/change-avatar/change-avatar-form';
import { ChangeInfoForm } from './profile/change-info/change-info-form';
import { SocialLinksForm } from './profile/social-links/social-links-form';

export function UserSettings() {
  const t = useTranslations('dashboard.settings');

  return (
    <div className="lg:px-10">
      <Heading
        description={t('header.description')}
        size="lg"
        title={t('header.heading')}
      />
      <Tabs className="mt-6 w-full max-w-2xl" defaultValue="profile">
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
          <div className="mt-5 flex flex-col gap-y-8">
            <ChangeAvatarForm />
            <ChangeInfoForm />
            <SocialLinksForm />
          </div>
        </TabsContent>

        <TabsContent value="account">
          <Heading
            className="mt-5"
            description={t('account.header.description')}
            title={t('account.header.heading')}
          />
          <div className="mt-5 flex flex-col gap-y-8">
            <ChangeEmailForm />
            <ChangePasswordForm />
          </div>
          <Heading
            className="mt-10 mb-6"
            description={t('account.header.security.description')}
            title={t('account.header.security.heading')}
          />
          <WrapperTotp />
          <Heading
            className="mt-10 mb-6"
            description={t('account.header.deactivation.description')}
            title={t('account.header.deactivation.heading')}
          />
          <DeactivateAccount />
        </TabsContent>

        <TabsContent value="appearance">
          <Heading
            className="mt-5"
            description={t('appearance.header.description')}
            title={t('appearance.header.heading')}
          />
          <div className="mt-5 flex flex-col gap-y-8">
            <ChangeThemeForm />
            <ChangeLanguageForm />
            <ChangeThemeColorForm />
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Heading
            className="mt-5"
            description={t('notifications.header.description')}
            title={t('notifications.header.heading')}
          />
          <div className="mt-5 flex flex-col gap-y-8">
            <ChangeNotificationsSettingsForm />
          </div>
        </TabsContent>
        <TabsContent value="sessions">Sessions</TabsContent>
      </Tabs>
    </div>
  );
}
