import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DeactivateForm } from './components/deactivate-form'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.deactivate')

  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE
  }
}

export default function DeactivatePage() {
  return <DeactivateForm />
}
