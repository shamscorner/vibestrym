import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/common/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/common/form";
import { Textarea } from "@/components/ui/common/textarea";
import { EmojiPicker } from "@/components/ui/custom/emoji-picker";
import { graphql } from "@/gql";
import type { Query } from "@/gql/graphql";
import {
  type SendMessageSchema,
  sendMessageSchema,
} from "./send-message.schema";

const SendChatMessageDoc = graphql(`
mutation SendChatMessage($data: SendMessageInput!) {
  sendChatMessage(data: $data) {
    streamId
  }
}
`);

interface SendMessageFormProps {
  channel: Query["findChannelByUsername"];
  isDisabled: boolean;
}

export function SendMessageForm({ channel, isDisabled }: SendMessageFormProps) {
  const t = useTranslations("streams.chat.sendMessage");

  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  const [send, { loading: isLoadingSend }] = useMutation(SendChatMessageDoc, {
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: SendMessageSchema) {
    send({
      variables: {
        data: {
          text: data.text,
          streamId: channel.stream.id,
        },
      },
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="mt-3 flex items-center gap-x-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-60">
              <FormControl>
                <div className="relative">
                  <Textarea
                    className="min-h-[40px] resize-none pr-8"
                    disabled={isDisabled || isLoadingSend}
                    onInput={(e) => {
                      e.currentTarget.style.height = "auto";
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    placeholder={t("placeholder")}
                    rows={1}
                    {...field}
                  />
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <EmojiPicker
                      isDisabled={isDisabled || isLoadingSend}
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={isDisabled || !isValid || isLoadingSend}
          size="icon"
          type="submit"
        >
          <SendHorizonal className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
