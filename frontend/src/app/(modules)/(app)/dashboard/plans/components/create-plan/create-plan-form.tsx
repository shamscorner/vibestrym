"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/common/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/form";
import { Input } from "@/components/ui/common/input";
import { Textarea } from "@/components/ui/common/textarea";
import { graphql } from "../../../../../../../gql";
import { type CreatePlanSchema, createPlanSchema } from "./create-plan.schema";

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

const CreateSponsorshipPlanDoc = graphql(`
mutation CreateSponsorshipPlan($data: CreatePlanInput!) {
  createSponsorshipPlan(data: $data)
}
`);

export function CreatePlanForm() {
  const t = useTranslations("dashboard.plans.createForm");

  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useQuery(FindMySponsorshipPlansDoc);

  const form = useForm<CreatePlanSchema>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const [create, { loading: isLoadingCreate }] = useMutation(
    CreateSponsorshipPlanDoc,
    {
      onCompleted() {
        setIsOpen(false);
        form.reset();
        refetch();
        toast.success(t("successMessage"));
      },
      onError() {
        toast.error(t("errorMessage"));
      },
    }
  );

  const { isValid } = form.formState;

  function onSubmit(data: CreatePlanSchema) {
    create({ variables: { data } });
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>{t("trigger")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("heading")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("title.label")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingCreate}
                      placeholder={t("title.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("title.description")}</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoadingCreate}
                      placeholder={t("description.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("description.description")}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("price.label")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingCreate}
                      placeholder={t("price.placeholder")}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("price.description")}</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={!isValid || isLoadingCreate}>
                {t("submitButton")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
