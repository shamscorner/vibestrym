import type { MetadataRoute } from "next";
import { APP_URL } from "@/constants/url.constants";
import { graphql } from "@/gql";
import { gqlFetch } from "@/gql/execute";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories } = await gqlFetch(FindAllCategoriesDoc).then((res) => ({
    categories: res.data?.findAllCategories ?? [],
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${APP_URL}/streams`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: `${APP_URL}/categories`,
      lastModified: new Date().toISOString(),
      priority: 0.7,
    },
  ];

  for (const category of categories) {
    routes.push({
      url: `${APP_URL}/categories/${category.slug}`,
      lastModified: category.updatedAt,
      priority: 0.6,
    });
  }

  return routes;
}
