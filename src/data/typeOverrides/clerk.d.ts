import { UserRole } from '@/drizzle/schema';

export {};

// Define global and custom typescript for the clerk
declare global {
  interface CustomJwtSessionClaims {
    dbId?: string;
    role?: UserRole;
  }

  interface UserPublicMetadata {
    dbId?: string;
    role?: UserRole;
  }
}
