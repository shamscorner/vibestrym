import { Section, Text } from '@react-email/components'
import * as React from 'react'
import { CheckCircleIcon } from 'lucide-react'

import { EmailButton, EmailFooter, EmailHeader, EmailLayout, TroubleshootingSection } from './components'

interface VerificationTemplateProps {
  domain: string
  token: string
}

export const VerificationTemplate = ({ domain, token }: VerificationTemplateProps) => {
  const verificationLink = `${domain}/account/verify?token=${token}`

  return (
    <EmailLayout preview="Account Verification">
      <EmailHeader
        icon={<CheckCircleIcon />}
        title="Verify Your Email"
        subtitle="Almost there! Just one more step to get started."
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          Thank you for signing up for <span className='font-semibold text-[#18B9AE]'>BDLive</span>!
          Please verify your email address before you can start exploring our platform.
        </Text>

        <EmailButton href={verificationLink}>
          Verify Email Address
        </EmailButton>

        <TroubleshootingSection link={verificationLink} />
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};
