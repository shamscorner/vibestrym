"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/utils/tw-merge";
import { useSidebar } from "../../hooks/sidebar";
import { DashboardNav } from "./dashboard-nav";
import { SidebarHeader } from "./sidebar-header";
import { UserNav } from "./user-nav";

export function Sidebar() {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const isDashboardPage = pathname.includes("/dashboard");

  return (
    <aside
      className={cn(
        "fixed left-0 z-50 mt-[75px] flex h-full flex-col border-border border-r bg-card transition-all duration-100 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader />
      {isDashboardPage ? <DashboardNav /> : <UserNav />}
    </aside>
  );
}
