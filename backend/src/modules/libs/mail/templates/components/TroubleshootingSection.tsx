import { Section, Text } from '@react-email/components'
import * as React from 'react'

interface TroubleshootingSectionProps {
  link: string
  className?: string
}

export const TroubleshootingSection = ({ link, className = 'pt-8' }: TroubleshootingSectionProps) => {
  return (
    <Section className={`border-t border-gray-100 ${className}`}>
      <Text className='text-xs text-gray-500 text-center leading-relaxed'>
        Having trouble clicking the button? Copy and paste this link into your browser:
      </Text>
      <Text className='text-xs text-[#18B9AE] text-center break-all mt-2'>
        {link}
      </Text>
    </Section>
  )
}
