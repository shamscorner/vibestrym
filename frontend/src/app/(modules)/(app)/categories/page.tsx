import { captureException } from "@sentry/nextjs";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { graphql } from "@/gql";
import { gqlFetch } from "@/gql/execute";
import type { CategoryModel } from "@/gql/graphql";
import { CategoriesList } from "./components/categories-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("categories");
  return {
    title: t("title"),
    description: t("description"),
    ...NO_INDEX_PAGE,
  };
}

const FindAllCategoriesDoc = graphql(`
query FindAllCategories {
  findAllCategories {
    id
    updatedAt
    title
    slug
    thumbnailUrl
  }
}
`);

export default async function CategoriesPage() {
  const t = await getTranslations("categories");

  const { categories } = await gqlFetch(FindAllCategoriesDoc)
    .then((res) => ({
      categories: res.data?.findAllCategories ?? [],
    }))
    .catch((error) => {
      captureException(error);
      return { categories: [] };
    });

  return (
    <CategoriesList
      categories={categories as CategoryModel[]}
      heading={t("heading")}
    />
  );
}
