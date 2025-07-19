import { Link, Section, Text } from '@react-email/components'
import * as React from 'react'

export const EmailFooter = () => {
  return (
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
  )
}
