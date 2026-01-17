import {
  Banknote,
  DollarSign,
  KeyRound,
  Medal,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Route } from "./route.interface";
import { SidebarItem } from "./sidebar-item";

export function DashboardNav() {
  const t = useTranslations("app.sidebar.dashboardNav");

  const routes: Route[] = [
    {
      label: t("settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      label: t("streamKeys"),
      href: "/dashboard/stream-keys",
      icon: KeyRound,
    },
    {
      label: t("chatSettings"),
      href: "/dashboard/chat-settings",
      icon: MessageSquare,
    },
    {
      label: t("followers"),
      href: "/dashboard/followers",
      icon: Users,
    },
    {
      label: t("sponsors"),
      href: "/dashboard/sponsors",
      icon: Medal,
    },
    {
      label: t("premium"),
      href: "/dashboard/plans",
      icon: DollarSign,
    },
    {
      label: t("transactions"),
      href: "/dashboard/transactions",
      icon: Banknote,
    },
  ];

  return (
    <div className="flex flex-col gap-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <SidebarItem key={index} route={route} />
      ))}
    </div>
  );
}
