declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_REST_COUNTRIES_API_KEY: string
      NEXT_PUBLIC_RESEND_API_KEY: string
    }
  }
}

export {}
