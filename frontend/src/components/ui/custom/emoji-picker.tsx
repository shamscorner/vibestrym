import Picker, {
  type EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Popover, PopoverContent, PopoverTrigger } from '../common/popover';

interface EmojiPickerProps {
  onChange: (value: string) => void;
  isDisabled: boolean;
}

export function EmojiPicker({ onChange, isDisabled }: EmojiPickerProps) {
  const t = useTranslations('streams.chat.sendMessage');

  const { theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger
        className="disabled:cursor-not-allowed"
        disabled={isDisabled}
      >
        <Smile className="size-[22px]" />
      </PopoverTrigger>
      <PopoverContent className='mr-28 mb-4 p-0' side="top">
        <Picker
          emojiStyle={EmojiStyle.APPLE}
          onEmojiClick={(emoji: EmojiClickData) => onChange(emoji.emoji)}
          searchPlaceHolder={t('emojiPlaceholder')}
          theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
        />
      </PopoverContent>
    </Popover>
  );
}
