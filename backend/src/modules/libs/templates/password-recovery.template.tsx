import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

interface PasswordRecoveryTemplateProps {
  domain: string
  token: string
  metadata: SessionMetadata
}

export function PasswordRecoveryTemplate({ domain, token, metadata }: PasswordRecoveryTemplateProps) {
  const resetLink = `${domain}/account/recovery/${token}`

  return (
    <Html>
      <Head />
      <Preview>Password Reset</Preview>
      <Tailwind>
        <Body className='font-sans bg-slate-50 min-h-screen py-12 px-4'>
          <Section className='max-w-lg mx-auto bg-white rounded-2xl overflow-hidden'>
            {/* Header Section */}
            <Section className='bg-[#18B9AE] px-8 py-12 text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center'>
                <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                  <Text className='text-[#18B9AE] text-lg font-bold'>🔒</Text>
                </div>
              </div>
              <Heading className='text-2xl font-bold text-white mb-2'>
                Password Reset
              </Heading>
              <Text className='text-white/80 text-sm'>
                Secure your account with a new password
              </Text>
            </Section>

            {/* Content Section */}
            <Section className='px-8 py-12'>
              <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
                You have requested a password reset for your <span className='font-semibold text-[#18B9AE]'>BDLive</span> account.
                Click the button below to create a new password.
              </Text>

              <Section className='text-center mb-8'>
                <Link
                  href={resetLink}
                  className='inline-flex items-center justify-center bg-[#18B9AE] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-sm no-underline'
                >
                  Reset Password
                </Link>
              </Section>

              {/* Request Information Section */}
              <Section className='bg-gray-50 rounded-xl p-6 mb-8'>
                <Heading className='text-lg font-semibold text-[#18B9AE] mb-4'>
                  Request Information:
                </Heading>
                <ul className="list-none text-gray-700 text-sm space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">🌍</span>
                    <span>Location: {metadata.location?.country}, {metadata.location?.city}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📱</span>
                    <span>Operating System: {metadata.device?.os}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🌐</span>
                    <span>Browser: {metadata.device?.browser}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">💻</span>
                    <span>IP Address: {metadata.ip}</span>
                  </li>
                </ul>
                <Text className='text-gray-600 text-sm mt-4'>
                  If you did not initiate this request, please ignore this message.
                </Text>
              </Section>

              <Section className='border-t border-gray-100 pt-8'>
                <Text className='text-xs text-gray-500 text-center leading-relaxed'>
                  Having trouble clicking the button? Copy and paste this link into your browser:
                </Text>
                <Text className='text-xs text-[#18B9AE] text-center break-all mt-2'>
                  {resetLink}
                </Text>
              </Section>
            </Section>

            {/* Footer Section */}
            <Section className='bg-gray-100 px-8 py-6 border-t border-gray-100'>
              <Text className='text-xs text-gray-600 text-center leading-relaxed'>
                Need help? Contact our support team at{' '}
                <Link
                  href="mailto:help@teastream.ru"
                  className="text-[#18B9AE] transition-colors duration-200 no-underline font-medium"
                >
                  help@teastream.ru
                </Link>
              </Text>
              <Text className='text-xs text-gray-500 text-center mt-3'>
                © {new Date().getFullYear()} BDLive. All rights reserved.
              </Text>
            </Section>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
