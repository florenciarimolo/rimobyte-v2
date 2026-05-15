/// <reference types="astro/client" />

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly GOOGLE_PLACES_API_KEY?: string;
  readonly GOOGLE_PLACES_PLACE_ID?: string;
  readonly RESEND_API_KEY?: string;
  readonly RECAPTCHA_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
