import { EmptyState } from "@/components/ui/custom/empty-state";
import { Heading } from "@/components/ui/custom/heading";

import type { Query } from "@/gql/graphql";

import { CategoryCard } from "./category-card";

interface CategoriesListProps {
  heading?: string;
  categories: Query["findRandomCategories"];
}

export function CategoriesList({ heading, categories }: CategoriesListProps) {
  return categories.length ? (
    <>
      {heading && <Heading title={heading} />}
      <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {categories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </>
  ) : (
    <EmptyState />
  );
}
