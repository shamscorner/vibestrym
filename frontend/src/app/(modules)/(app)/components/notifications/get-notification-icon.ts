import {
  BellIcon,
  CheckIcon,
  FingerprintIcon,
  MedalIcon,
  RadioIcon,
  UserIcon,
} from "lucide-react";
import { NotificationType } from "@/gql/graphql";

export function getNotificationIcon(type?: NotificationType) {
  switch (type) {
    case NotificationType.StreamStart:
      return RadioIcon;
    case NotificationType.NewFollower:
      return UserIcon;
    case NotificationType.NewSponsorship:
      return MedalIcon;
    case NotificationType.EnableTwoFactor:
      return FingerprintIcon;
    case NotificationType.VerifiedChannel:
      return CheckIcon;
    default:
      return BellIcon;
  }
}
