import { Link, Section } from '@react-email/components'
import * as React from 'react'

interface EmailButtonProps {
  href: string
  children: React.ReactNode
  danger?: boolean
}

export const EmailButton = ({ href, children, danger }: EmailButtonProps) => {
  return (
    <Section className='text-center mb-8'>
      <Link
        href={href}
        className={`inline-flex items-center justify-center ${danger ? 'bg-red-600' : 'bg-[#18B9AE]'
          } text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-sm no-underline`}
      >
        {children}
      </Link>
    </Section>
  )
}
