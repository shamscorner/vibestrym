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

const FindMyFollowersDoc = graphql(`
query FindMyFollowers {
  findMyFollowers {
    createdAt
    follower {
      username
      avatar
      isVerified
    }
  }
}
`);

export function FollowersTable() {
  const t = useTranslations("dashboard.followers");

  const { data, loading: isLoadingFollowers } = useQuery(FindMyFollowersDoc);
  const followers = data?.findMyFollowers ?? [];

  const followersColumns: ColumnDef<(typeof followers)[number]>[] = [
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "follower",
      header: t("columns.user"),
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <ChannelAvatar channel={row.original.follower} size="sm" />
          <h2>{row.original.follower.username}</h2>
          {row.original.follower.isVerified && <ChannelVerified size="sm" />}
        </div>
      ),
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
            <Link href={`/${row.original.follower.username}`} target="_blank">
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
    <div className="max-w-2xl lg:px-10">
      <Heading
        description={t("header.description")}
        size="lg"
        title={t("header.heading")}
      />
      <div className="mt-5">
        {isLoadingFollowers ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={followersColumns} data={followers} />
        )}
      </div>
    </div>
  );
}
