import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * createEnv:
 * used to create a schema of the environment variables, validating that the environment variables are set properly and are of the correct type.
 */
export const env = createEnv({
  /**
   * server:
   * This is where the actual environment variables for the server are declared and validated.
   */
  server: {
    DB_PASSWORD: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_HOST: z.string().min(1),
  },
  /**
   * experimental__runtimeEnv:
   * all environment variables available at runtime (e.g., during deployment) are accessible to the app.
   */
  experimental__runtimeEnv: process.env,

})