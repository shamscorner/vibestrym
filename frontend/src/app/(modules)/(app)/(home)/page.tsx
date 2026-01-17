import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_TITLE } from "@/constants/seo.constants";
import { graphql } from "@/gql";
import { gqlFetch } from "@/gql/execute";
import type { CategoryModel, StreamModel } from "@/gql/graphql";
import { CategoriesList } from "../categories/components/categories-list";
import { StreamsList } from "../streams/components/stream-list";

const findRandomStreamsDocument = graphql(`
query FindRandomStreams {
  findRandomStreams {
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
`);

const findRandomCategoriesDocument = graphql(`
query FindRandomCategories {
  findRandomCategories {
    title
    slug
    thumbnailUrl
  }
}
`);

export function generateMetadata(): Metadata {
  return {
    title: SITE_TITLE,
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const { data: streamsData } = await gqlFetch(findRandomStreamsDocument);
  const { data: categoriesData } = await gqlFetch(findRandomCategoriesDocument);

  return (
    <div className="flex flex-col gap-y-10">
      <StreamsList
        heading={t("streamsHeading")}
        streams={streamsData?.findRandomStreams as StreamModel[]}
      />
      <CategoriesList
        categories={categoriesData?.findRandomCategories as CategoryModel[]}
        heading={t("categoriesHeading")}
      />
    </div>
  );
}
