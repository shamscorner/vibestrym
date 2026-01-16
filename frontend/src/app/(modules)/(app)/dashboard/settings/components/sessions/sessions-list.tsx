"use client";

import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/ui/custom/heading";
import { ToggleCardSkeleton } from "@/components/ui/custom/toggle-card";
import { graphql } from "../../../../../../../gql";
import { SessionItem } from "./session-item";

const FindSessionsByUserDoc = graphql(`
query FindSessionsByUser {
  findSessionsByUser {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
`);

const FindCurrentSessionDoc = graphql(`
query FindCurrentSession {
  findCurrentSession {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
`);

export function SessionsList() {
  const t = useTranslations("dashboard.settings.sessions");

  const { data: sessionData, loading: isLoadingCurrent } = useQuery(
    FindCurrentSessionDoc
  );
  const currentSession = sessionData?.findCurrentSession;

  const { data: sessionsData, loading: isLoadingSessions } = useQuery(
    FindSessionsByUserDoc
  );
  const sessions = sessionsData?.findSessionsByUser ?? [];

  return (
    <div className="flex flex-col gap-y-6">
      <Heading size="sm" title={t("info.current")} />
      {isLoadingCurrent ? (
        <ToggleCardSkeleton />
      ) : (
        currentSession && (
          <SessionItem isCurrentSession session={currentSession} />
        )
      )}

      <Heading size="sm" title={t("info.active")} />

      {isLoadingSessions ? (
        Array.from({ length: 3 }).map((_, index) => (
          <ToggleCardSkeleton key={index} />
        ))
      ) : sessions.length ? (
        sessions.map((session, index) => (
          <SessionItem key={index} session={session} />
        ))
      ) : (
        <div className="text-muted-foreground">{t("info.notFound")}</div>
      )}
    </div>
  );
}
