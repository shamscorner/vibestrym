import { Section, Text } from '@react-email/components'
import * as React from 'react'
import { ShieldIcon } from 'lucide-react'

import { EmailButton, EmailFooter, EmailHeader, EmailLayout } from './components'

interface EnableTwoFactorTemplateProps {
  domain: string
}

export function EnableTwoFactorTemplate({ domain }: EnableTwoFactorTemplateProps) {
  const settingsLink = `${domain}/dashboard/settings`

  return (
    <EmailLayout preview="Secure Your Account">
      <EmailHeader
        icon={<ShieldIcon />}
        title="Enable Two-Factor Authentication"
        subtitle="Enhance your account security with an extra layer of protection."
        danger
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          Protect your <span className='font-semibold text-red-600'>Vibestrym</span> account
          by enabling two-factor authentication. This additional security measure requires
          a verification code that only you can access.
        </Text>

        <EmailButton href={settingsLink} danger>
          Enable Two-Factor Auth
        </EmailButton>
      </Section>

      <EmailFooter />
    </EmailLayout>
  )
}
