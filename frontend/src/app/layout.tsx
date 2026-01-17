import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/common/sonner";
import { ConfirmDialogGlobal } from "@/components/ui/custom/confirm-dialog-global";
import { ThemeColorSwitcher } from "@/components/ui/custom/theme-color-switcher";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/constants/seo.constants";
import { APP_URL } from "@/constants/url.constants";
import { ApolloClientProvider } from "@/providers/apollo-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  applicationName: SITE_NAME,
  authors: [
    {
      name: "Shamim Hossain",
      url: new URL("https://github.com/shamscorner"),
    },
  ],
  keywords: SITE_KEYWORDS,
  generator: "Next.js",
  creator: "Shamim Hossain",
  publisher: "shamscorner",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "touch-icons",
      url: "/apple-touch-icon.png",
      sizes: "256x256",
      type: "image/png",
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    emails: ["contact@vibestrym.com"],
    locale: "en_US",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
    url: new URL(APP_URL),
  },
  twitter: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  appleWebApp: {
    title: SITE_NAME,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html className="scroll-smooth" lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.className} h-dvh overscroll-none bg-background text-foreground antialiased`}
      >
        <ThemeColorSwitcher />
        <ApolloClientProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              <main className="h-full">{children}</main>
              <ConfirmDialogGlobal />
              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
