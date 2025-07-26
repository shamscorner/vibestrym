import { captureException } from '@sentry/nextjs';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { SERVER_URL } from '@/constants/url.constants';

import {
  FindAllCategoriesDocument,
  type FindAllCategoriesQuery
} from '@/graphql/_generated/output'
import { CategoriesList } from './components/categories-list';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('categories');
  return {
    title: t('title'),
    description: t('description'),
    ...NO_INDEX_PAGE,
  };
}

async function findAllCategories() {
  try {
    const query = FindAllCategoriesDocument.loc?.source.body;

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      categories: data.data
        .findAllCategories as FindAllCategoriesQuery['findAllCategories'],
    };
  } catch (error) {
    captureException(error, {
      extra: {
        module: 'categories',
        action: 'findAllCategories'
      }
    });
    throw new Error('Error fetching categories');
  }
}

export default async function CategoriesPage() {
  const t = await getTranslations('categories')

  const { categories } = await findAllCategories();

  return <CategoriesList categories={categories} heading={t('heading')} />;
}
