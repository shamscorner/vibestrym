import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import { Section, Text } from '@react-email/components'
import * as React from 'react'
import { AlertCircleIcon } from 'lucide-react'

import { EmailFooter, EmailHeader, EmailLayout, RequestInfoSection } from './components'

interface DeactivateTemplateProps {
  token: string
  metadata: SessionMetadata
}

export function DeactivateTemplate({ token, metadata }: DeactivateTemplateProps) {
  return (
    <EmailLayout preview="Account Deactivation">
      <EmailHeader
        icon={<AlertCircleIcon />}
        title="Account Deactivation Request"
        subtitle="You have initiated the process of deactivating your account."
        danger
      />

      <Section className='px-8 py-12'>
        <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
          You have initiated the process of deactivating your account on the <span className='font-semibold text-red-600'>Vibestrym</span> platform.
        </Text>

        <Section className='bg-gray-50 rounded-xl p-6 text-center mb-8'>
          <Text className='text-xl font-semibold text-red-600 mb-2'>
            Confirmation Code:
          </Text>
          <Text className='text-3xl font-semibold text-gray-700 mb-2'>
            {token}
          </Text>
          <Text className='text-gray-600 text-sm'>
            This code is valid for 5 minutes.
          </Text>
        </Section>

        <RequestInfoSection metadata={metadata} />
      </Section>

      <EmailFooter />
    </EmailLayout>
  )
}
