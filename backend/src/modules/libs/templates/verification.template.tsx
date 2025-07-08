import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface VerificationTemplateProps {
  domain: string
  token: string
}

export const VerificationTemplate = ({ domain, token }: VerificationTemplateProps) => {
  const verificationLink = `${domain}/account/verify?token=${token}`

  return (
    <Html>
      <Head />
      <Preview>Account Verification</Preview>
      <Tailwind>
        <Body className='font-sans bg-slate-50 min-h-screen py-12 px-4'>
          <Section className='max-w-lg mx-auto bg-white rounded-2xl overflow-hidden'>
            {/* Header Section */}
            <Section className='bg-[#18B9AE] px-8 py-12 text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center'>
                <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                  <Text className='text-[#18B9AE] text-lg font-bold'>✓</Text>
                </div>
              </div>
              <Heading className='text-2xl font-bold text-white mb-2'>
                Verify Your Email
              </Heading>
              <Text className='text-white/80 text-sm'>
                Almost there! Just one more step to get started.
              </Text>
            </Section>

            {/* Content Section */}
            <Section className='px-8 py-12'>
              <Text className='text-gray-700 text-base leading-relaxed mb-8 text-center'>
                Thank you for signing up for <span className='font-semibold text-[#18B9AE]'>BDLive</span>!
                Please verify your email address before you can start exploring our platform.
              </Text>

              <Section className='text-center mb-8'>
                <Link
                  href={verificationLink}
                  className='inline-flex items-center justify-center bg-[#18B9AE] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-sm no-underline'
                >
                  Verify Email Address
                </Link>
              </Section>

              <Section className='border-t border-gray-100 pt-8'>
                <Text className='text-xs text-gray-500 text-center leading-relaxed'>
                  Having trouble clicking the button? Copy and paste this link into your browser:
                </Text>
                <Text className='text-xs text-[#18B9AE] text-center break-all mt-2'>
                  {verificationLink}
                </Text>
              </Section>
            </Section>

            {/* Footer Section */}
            <Section className='bg-gray-100 px-8 py-6 border-t border-gray-100'>
              <Text className='text-xs text-gray-600 text-center leading-relaxed'>
                Need help? Contact our support team at{' '}
                <Link
                  href="mailto:support@bdlive.com"
                  className="text-[#18B9AE] transition-colors duration-200 no-underline font-medium"
                >
                  support@bdlive.com
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
  );
};
