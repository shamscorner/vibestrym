import { Section, Text } from '@react-email/components'
import * as React from 'react'
import { LockIcon } from 'lucide-react'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import { EmailButton, EmailFooter, EmailHeader, EmailLayout, RequestInfoSection, TroubleshootingSection } from './components'

interface PasswordRecoveryTemplateProps {
  domain: string
  token: string
  metadata: SessionMetadata
}

export function PasswordRecoveryTemplate({ domain, token, metadata }: PasswordRecoveryTemplateProps) {
  const resetLink = `${domain}/account/recovery/${token}`

  return (
    <EmailLayout preview="Password Reset">
      <EmailHeader
        icon={<LockIcon />}
        title="Password Reset"
        subtitle="Secure your account with a new password"
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          You have requested a password reset for your <span className='font-semibold text-[#18B9AE]'>BDLive</span> account.
          Click the button below to create a new password.
        </Text>

        <EmailButton href={resetLink}>
          Reset Password
        </EmailButton>

        <RequestInfoSection metadata={metadata} />

        <TroubleshootingSection link={resetLink} className="pt-4" />
      </Section>

      <EmailFooter />
    </EmailLayout>
  )
}
