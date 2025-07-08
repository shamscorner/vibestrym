import { Link, Section } from '@react-email/components'
import * as React from 'react'

interface EmailButtonProps {
  href: string
  children: React.ReactNode
}

export const EmailButton = ({ href, children }: EmailButtonProps) => {
  return (
    <Section className='text-center mb-8'>
      <Link
        href={href}
        className='inline-flex items-center justify-center bg-[#18B9AE] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-sm no-underline'
      >
        {children}
      </Link>
    </Section>
  )
}
