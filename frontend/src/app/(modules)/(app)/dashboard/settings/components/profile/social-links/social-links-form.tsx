'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import { Skeleton } from '@/components/ui/common/skeleton';
import { FormWrapper } from '@/components/ui/custom/form-wrapper';

import {
  useCreateSocialLinkMutation,
  useFindSocialLinksQuery,
} from '@/graphql/_generated/output';
import {
  type SocialLinksSchema,
  socialLinksSchema,
} from './social-links.schema';
import { SocialLinksList } from './social-links-list';

export function SocialLinksForm() {
  const t = useTranslations(
    'dashboard.settings.profile.socialLinks.createForm'
  );

  const { loading: isLoadingLinks, refetch } = useFindSocialLinksQuery();

  const form = useForm<SocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
    onCompleted() {
      form.reset();
      refetch();
      toast.success(t('successMessage'));
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: SocialLinksSchema) {
    create({ variables: { data } });
  }

  return isLoadingLinks ? (
    <SocialLinksFormSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form className="grid gap-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t('title.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingCreate}
                    placeholder={t('title.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('title.description')}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t('url.label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingCreate}
                    placeholder={t('url.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('url.description')}</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end px-5 pb-5">
            <Button disabled={!isValid || isLoadingCreate}>
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
      <SocialLinksList />
    </FormWrapper>
  );
}

export function SocialLinksFormSkeleton() {
  return <Skeleton className="h-72 w-full" />;
}
