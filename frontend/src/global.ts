import messages from "../public/languages/en.json" with { type: "json" };
import type { Language } from "./libs/i18n/config";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
    Locale: Language;
  }
}
