import { Skeleton } from "../common/skeleton";
import { Switch } from "../common/switch";

import { CardContainer } from "./card-container";

interface ToggleCardProps {
  heading: string;
  description: string;
  isDisabled?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleCard({
  heading,
  description,
  isDisabled,
  value,
  onChange,
}: ToggleCardProps) {
  return (
    <CardContainer
      description={description}
      heading={heading}
      rightContent={
        <Switch
          checked={value}
          disabled={isDisabled}
          onCheckedChange={onChange}
        />
      }
    />
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="mt-6 h-20 w-full" />;
}
