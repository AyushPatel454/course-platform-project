import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * createEnv:
 * used to create a schema of the environment variables, validating that the environment variables are set properly and are of the correct type.
 */
export const env = createEnv({
  /**
   * client:
   * This is where the actual environment variables for the client are declared and validated.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  },
  /**
   * experimental__runtimeEnv:
   * all environment variables available at runtime (e.g., during deployment) are accessible to the app.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  },
})