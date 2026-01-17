import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql";
import { gqlFetch } from "@/gql/execute";
import type { CategoryModel } from "@/gql/graphql";
import { getMediaSource } from "@/utils/get-media-source";
import { CategoryOverview } from "./components/category-overview";

const findCategoryBySlugDocument = graphql(`
query FindCategoryBySlug($slug: String!) {
  findCategoryBySlug(slug: $slug) {
    title
    thumbnailUrl
    description
    streams {
      title
      thumbnailUrl
      isLive
      user {
        username
        avatar
        isVerified
      }
      category {
        title
        slug
      }
    }
  }
}
`);

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { data: categoryData } = await gqlFetch(findCategoryBySlugDocument, {
    slug: params.slug,
  });

  const category = categoryData?.findCategoryBySlug;

  if (!category) {
    return notFound();
  }

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: getMediaSource(category.thumbnailUrl),
          alt: category.title,
        },
      ],
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { data: categoryData } = await gqlFetch(findCategoryBySlugDocument, {
    slug: params.slug,
  });

  const category = categoryData?.findCategoryBySlug;

  if (!category) {
    return notFound();
  }

  return <CategoryOverview category={category as CategoryModel} />;
}
