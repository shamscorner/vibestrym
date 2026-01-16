import type { PropsWithChildren } from "react";
import { Header } from "./components/header/header";
import { LayoutWrapper } from "./components/layout-wrapper";
import { Sidebar } from "./components/sidebar/sidebar";

export default function ProtectedLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="flex h-full flex-col">
      <div className="fixed inset-y-0 z-50 h-[75px] w-full">
        <Header />
      </div>
      <Sidebar />
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}
