// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from "@sentry/nextjs";

init({
  dsn: "https://763fb39cec0dadbc40688ce37337dbd2@o4509662905303040.ingest.us.sentry.io/4509702264520704",

  enabled: process.env.NODE_ENV !== "development",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Enable logs to be sent to Sentry
  _experiments: { enableLogs: true },
});
