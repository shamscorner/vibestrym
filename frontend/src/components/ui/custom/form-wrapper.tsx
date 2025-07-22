import type { PropsWithChildren } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '../common/card'

interface FormWrapperProps {
  heading: string
}

export function FormWrapper({
  children,
  heading
}: PropsWithChildren<FormWrapperProps>) {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className='text-lg'>{heading}</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>{children}</CardContent>
    </Card>
  )
}
