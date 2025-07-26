import { captureException } from '@sentry/nextjs';
import { getTranslations } from 'next-intl/server';
import { SERVER_URL } from '@/constants/url.constants';
import {
  FindRandomCategoriesDocument,
  type FindRandomCategoriesQuery,
  FindRandomStreamsDocument,
  type FindRandomStreamsQuery,
} from '@/graphql/_generated/output';
import { CategoriesList } from '../categories/components/categories-list';
import { StreamsList } from '../streams/components/stream-list';

async function findRandomStreams() {
  try {
    const query = FindRandomStreamsDocument.loc?.source.body;

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
      streams: data.data
        .findRandomStreams as FindRandomStreamsQuery['findRandomStreams'],
    };
  } catch (error) {
    captureException(error, {
      extra: {
        feature: 'home',
      },
    });
    throw new Error('Error fetching streams');
  }
}

async function findRandomCategories() {
  try {
    const query = FindRandomCategoriesDocument.loc?.source.body;

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
        .findRandomCategories as FindRandomCategoriesQuery['findRandomCategories'],
    };
  } catch (error) {
    captureException(error, {
      extra: {
        feature: 'home',
      },
    });
    throw new Error('Error fetching categories');
  }
}

export default async function HomePage() {
  const t = await getTranslations('home');

  const { streams } = await findRandomStreams();
  const { categories } = await findRandomCategories();

  return (
    <div className="flex flex-col gap-y-10">
      <StreamsList heading={t('streamsHeading')} streams={streams} />
      <CategoriesList
        categories={categories}
        heading={t('categoriesHeading')}
      />
    </div>
  );
}
