import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/common/button';
import { Slider } from '@/components/ui/common/slider';
import { Hint } from '@/components/ui/custom/hint';

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export function VolumeControl({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) {
  const t = useTranslations('streams.stream.video.player');

  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  function handleChange(data: number[]) {
    onChange(data[0]);
  }

  return (
    <div className="flex items-center gap-2">
      <Hint asChild label={t('volume')}>
        <Button
          className="text-white hover:bg-white/10"
          onClick={onToggle}
          size="icon"
          variant="ghost"
        >
          <Icon className="size-6" />
        </Button>
      </Hint>
      <Slider
        className="w-32 cursor-pointer"
        max={100}
        onValueChange={handleChange}
        step={1}
        value={[value]}
      />
    </div>
  );
}
