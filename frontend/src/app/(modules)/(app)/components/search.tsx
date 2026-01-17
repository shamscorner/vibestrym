"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/common/button";
import { Input } from "@/components/ui/common/input";

export function Search() {
  const t = useTranslations("app.header.search");

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/streams?searchTerm=${searchTerm}`);
    } else {
      router.push("/streams");
    }
  }

  return (
    <div className="ml-auto hidden lg:block">
      <form className="relative flex items-center" onSubmit={onSubmit}>
        <Input
          className="w-full pr-10 pl-4 lg:w-[400px]"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("placeholder")}
          type="text"
          value={searchTerm}
        />
        <Button className="absolute right-0 h-9 w-9" type="submit">
          <SearchIcon className="absolute size-[18px]" />
          <span className="sr-only">{t("buttonLabel")}</span>
        </Button>
      </form>
    </div>
  );
}
