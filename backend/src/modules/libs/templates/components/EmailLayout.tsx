import { Body, Head, Preview, Section, Tailwind } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className='font-sans bg-slate-50 min-h-screen py-12 px-4'>
          <Section className='max-w-lg mx-auto bg-white rounded-2xl overflow-hidden'>
            {children}
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
