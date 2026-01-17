"use client";

import {
  LayoutDashboardIcon,
  LoaderIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";
import { ChannelAvatar } from "@/components/ui/custom/channel-avatar";
import { useCurrentAccount } from "../../(auth)/hooks/current-account";
import { Notifications } from "./notifications/notifications";

export function ProfileMenu() {
  const t = useTranslations("app.header.menu.profile");
  const router = useRouter();

  const { user, isLoadingProfile } = useCurrentAccount();

  return isLoadingProfile || !user ? (
    <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
  ) : (
    <>
      <Notifications />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChannelAvatar channel={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <ChannelAvatar channel={user} />
            <h2 className="font-medium text-foreground">{user.username}</h2>
          </div>
          <div className="mt-2" />
          <Link href={`/${user.username}`}>
            <DropdownMenuItem>
              <UserIcon className="mx-2 size-4 text-muted-foreground" />
              {t("channel")}
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              <LayoutDashboardIcon className="mx-2 size-4 text-muted-foreground" />
              {t("dashboard")}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/logout")}>
            <LogOutIcon className="mx-2 size-4 text-muted-foreground" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
