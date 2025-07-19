import { Section, Text } from '@react-email/components'
import * as React from 'react'
import { BadgeCheckIcon } from 'lucide-react'

import { EmailFooter, EmailHeader, EmailLayout } from './components'

export const VerifyChannelTemplate = () => {
  return (
    <EmailLayout preview="Your channel is verified">
      <EmailHeader
        icon={<BadgeCheckIcon />}
        title="Channel Verified"
        subtitle="Congratulations! Your channel has received the official badge."
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          We are pleased to inform you that <span className='font-semibold text-[#18B9AE]'>your channel</span> is
          now verified and you have received the official badge.
        </Text>

        <Section className="bg-gray-50 rounded-xl p-6 mb-8">
          <Text className="text-xl font-semibold text-[#18B9AE] mb-4 text-center">
            What does this mean?
          </Text>
          <Text className='text-gray-700 text-base leading-relaxed text-center'>
            The verification badge confirms the authenticity of your channel and improves viewer trust.
            You now have access to additional features and increased visibility.
          </Text>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};
