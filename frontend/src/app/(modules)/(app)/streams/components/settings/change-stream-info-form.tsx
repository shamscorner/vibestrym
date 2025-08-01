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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/select';

import {
  type FindChannelByUsernameQuery,
  useChangeStreamInfoMutation,
  useFindAllCategoriesQuery,
} from '@/graphql/_generated/output';

import {
  type ChangeStreamInfoSchema,
  changeStreamInfoSchema,
} from './change-stream-info.schema';

interface Props {
  stream: FindChannelByUsernameQuery['findChannelByUsername']['stream'];
}

export function ChangeStreamInfoForm({ stream }: Props) {
  const t = useTranslations('streams.stream.settings.info');

  const { data } = useFindAllCategoriesQuery();
  const categories = data?.findAllCategories ?? [];

  const form = useForm<ChangeStreamInfoSchema>({
    resolver: zodResolver(changeStreamInfoSchema),
    values: {
      title: stream?.title ?? '',
      categoryId: stream?.category?.id ?? '',
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeStreamInfoMutation({
    onCompleted() {
      toast.success(t('successMessage'));
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(values: ChangeStreamInfoSchema) {
    update({ variables: { data: values } });
  }

  return (
    <Form {...form}>
      <form className='mt-4 grid gap-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('title.label')}</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoadingUpdate}
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('category.label')}</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('category.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="p-0">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t('category.description')}</FormDescription>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-5">
          <Button disabled={!isValid || isLoadingUpdate}>
            {t('submitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
