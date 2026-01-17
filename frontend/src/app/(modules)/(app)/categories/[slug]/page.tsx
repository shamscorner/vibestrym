import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql";
import { useGraphQL } from "@/gql/execute";
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

  const { findCategoryBySlug: category } =
    useGraphQL(findCategoryBySlugDocument, {
      slug: params.slug,
    }).data?.data ?? {};

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

  const { findCategoryBySlug: category } =
    useGraphQL(findCategoryBySlugDocument, {
      slug: params.slug,
    }).data?.data ?? {};

  if (!category) {
    return notFound();
  }

  return <CategoryOverview category={category as CategoryModel} />;
}
