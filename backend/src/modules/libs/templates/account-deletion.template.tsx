import {
  Section,
  Text,
  Link
} from '@react-email/components';
import * as React from 'react';
import { EmailFooter, EmailHeader, EmailLayout } from './components';
import { Trash2Icon } from 'lucide-react';

interface AccountDeletionTemplateProps {
  domain: string
}

export function AccountDeletionTemplate({ domain }: AccountDeletionTemplateProps) {
  const registerLink = `${domain}/account/create`

  return (
    <EmailLayout preview="Account Deleted">
      <EmailHeader
        icon={<Trash2Icon />}
        title="Account Deletion Confirmation"
        subtitle="Your account has been successfully deleted from our system."
        danger
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          Your account has been completely erased from the BDLive database. All your data and information have been permanently deleted.
        </Text>

        <Section className="bg-gray-50 rounded-xl p-6 text-center mb-8">
          <Text>
            You will no longer receive notifications on Telegram and email.
          </Text>
          <Text>
            If you want to return to the platform, you can register using the following link:
          </Text>
          <Link
            href={registerLink}
            className="inline-flex justify-center items-center rounded-md mt-2 text-sm font-medium text-white bg-[#18B9AE] px-5 py-2 rounded-full"
          >
            Register on BDLive
          </Link>
        </Section>

        <Section className="text-center text-black">
          <Text>
            Thank you for being with us! We will always be happy to see you on the platform.
          </Text>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  )
}
