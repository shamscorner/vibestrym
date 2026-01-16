"use client";

import { useQuery } from "@apollo/client/react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import { ChannelVerified } from "@/components/ui/custom/channel-verified";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/ui/custom/data-table";
import { Heading } from "@/components/ui/custom/heading";
import { formatDate } from "@/utils/format-date";
import { graphql } from "../../../../../../gql";

const FindMySponsorsDoc = graphql(`
query FindMySponsors {
  findMySponsors {
    expiresAt
    user {
      username
      avatar
      isVerified
    }
    plan {
      title
    }
  }
}
`);

export function SponsorsTable() {
  const t = useTranslations("dashboard.sponsors");

  const { data, loading: isLoadingSponsors } = useQuery(FindMySponsorsDoc);
  const sponsors = data?.findMySponsors ?? [];

  const sponsorsColumns: ColumnDef<(typeof sponsors)[0]>[] = [
    {
      accessorKey: "expiresAt",
      header: t("columns.date"),
      cell: ({ row }) => formatDate(row.original.expiresAt),
    },
    {
      accessorKey: "user",
      header: t("columns.user"),
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <ChannelAvatar channel={row.original.user} size="sm" />
          <h2>{row.original.user.username}</h2>
          {row.original.user.isVerified && <ChannelVerified size="sm" />}
        </div>
      ),
    },
    {
      accessorKey: "plan",
      header: t("columns.plan"),
      cell: ({ row }) => row.original.plan.title,
    },
    {
      accessorKey: "actions",
      header: t("columns.actions"),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-8 p-0" variant="ghost">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <Link href={`/${row.original.user.username}`} target="_blank">
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                {t("columns.viewChannel")}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="max-w-4xl lg:px-10">
      <Heading
        description={t("header.description")}
        size="lg"
        title={t("header.heading")}
      />
      <div className="mt-5">
        {isLoadingSponsors ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={sponsorsColumns} data={sponsors} />
        )}
      </div>
    </div>
  );
}
