'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { FindRandomCategoriesQuery } from '@/graphql/_generated/output';
import { getRandomColor } from '@/utils/color';
import { getMediaSource } from '@/utils/get-media-source';
import { cn } from '@/utils/tw-merge';
import { useSidebar } from '../../hooks/sidebar';

interface CategoryCardProps {
  category: FindRandomCategoriesQuery['findRandomCategories'][0];
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [randomColor, setRandomColor] = useState('');
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  return (
    <Link
      className="flex h-full w-full flex-col gap-y-3"
      href={`/categories/${category.slug}`}
    >
      <div
        className={cn(
          'group relative cursor-pointer rounded-xl',
          isCollapsed ? 'h-60' : 'h-52'
        )}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            backgroundColor: randomColor,
          }}
        />
        <Image
          alt={category.title}
          className="group-hover:-translate-y-2 rounded-lg object-cover transition-transform group-hover:translate-x-2"
          fill
          src={getMediaSource(category.thumbnailUrl)}
        />
      </div>
      <div>
        <h2 className="truncate font-semibold text-base text-foreground hover:opacity-80">
          {category.title}
        </h2>
      </div>
    </Link>
  );
}
