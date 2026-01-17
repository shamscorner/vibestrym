"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCurrentAccount } from "@/app/(modules)/(auth)/hooks/current-account";
import { Button } from "@/components/ui/common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/ui/custom/data-table";
import { Heading } from "@/components/ui/custom/heading";
import { useConfirmDialog } from "@/hooks/confirm-dialog";
import { convertPrice } from "@/utils/convert-price";
import { formatDate } from "@/utils/format-date";
import { graphql } from "../../../../../../gql";
import { CreatePlanForm } from "./create-plan/create-plan-form";
import { VerifiedChannelAlert } from "./verified-channel-alert";

const RemoveSponsorshipPlanDoc = graphql(`
mutation RemoveSponsorshipPlan($planId: String!) {
  removeSponsorshipPlan(planId: $planId)
}
`);

const FindMySponsorshipPlansDoc = graphql(`
query FindMySponsorshipPlans {
  findMySponsorshipPlans {
    id
    createdAt
    title
    price
  }
}
`);

export function PlansTable() {
  const t = useTranslations("dashboard.plans");

  const { user } = useCurrentAccount();
  const { confirm: confirmRemove } = useConfirmDialog();

  const {
    data,
    loading: isLoadingPlans,
    refetch,
  } = useQuery(FindMySponsorshipPlansDoc);
  const plans = data?.findMySponsorshipPlans ?? [];

  const [remove, { loading: isLoadingRemove }] = useMutation(
    RemoveSponsorshipPlanDoc,
    {
      onCompleted() {
        refetch();
        toast.success(t("columns.remove.successMessage"));
      },
      onError() {
        toast.error(t("columns.remove.errorMessage"));
      },
    }
  );

  const plansColumns: ColumnDef<(typeof plans)[number]>[] = [
    {
      accessorKey: "createdAt",
      header: t("columns.date"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "title",
      header: t("columns.title"),
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "price",
      header: t("columns.price"),
      cell: ({ row }) => convertPrice(row.original.price),
    },
    {
      accessorKey: "actions",
      header: t("columns.actions"),
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="size-8 p-0" variant="ghost">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right">
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                disabled={isLoadingRemove}
                onClick={async () =>
                  await confirmRemove({
                    title: t("columns.remove.confirmDialog.heading"),
                    description: t("columns.remove.confirmDialog.message"),
                    actionType: "destructive",
                    confirmText: t(
                      "columns.remove.confirmDialog.confirmButton"
                    ),
                    action: async () => {
                      await remove({
                        variables: { planId: row.original.id },
                      });
                      return true;
                    },
                  })
                }
              >
                <Trash className="mr-2 size-4" />
                {t("columns.remove.heading")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return user?.isVerified ? (
    <div className="max-w-4xl lg:px-10">
      <div className="flex flex-col justify-between gap-y-3 lg:flex-row lg:items-end lg:gap-y-0">
        <Heading
          description={t("header.description")}
          size="lg"
          title={t("header.heading")}
        />
        <div className="grid grid-cols-1 gap-x-4">
          <CreatePlanForm />
        </div>
      </div>
      <div className="mt-5">
        {isLoadingPlans ? (
          <DataTableSkeleton />
        ) : (
          <DataTable columns={plansColumns} data={plans} />
        )}
      </div>
    </div>
  ) : (
    <VerifiedChannelAlert />
  );
}
