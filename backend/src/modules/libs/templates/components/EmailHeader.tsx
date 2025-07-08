import { cn } from '@/src/shared/utils/tailwind.util'
import { Heading, Section, Text } from '@react-email/components'
import * as React from 'react'

interface EmailHeaderProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  danger?: boolean
}

export const EmailHeader = ({ icon, title, subtitle, danger = false }: EmailHeaderProps) => {
  return (
    <Section className={cn(`bg-[#18B9AE] px-8 py-12 text-center`, danger ? 'bg-red-500' : 'bg-[#18B9AE]')}>
      <div className='w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center'>
        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
          <div className='text-[#18B9AE] w-5 h-5 flex items-center justify-center'>
            {icon}
          </div>
        </div>
      </div>
      <Heading className='text-2xl font-bold text-white mb-2'>
        {title}
      </Heading>
      <Text className='text-white/80 text-sm'>
        {subtitle}
      </Text>
    </Section>
  )
}
