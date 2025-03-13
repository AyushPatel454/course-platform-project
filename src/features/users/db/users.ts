import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

// CREATE: User
export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkUserId], // If a user with the same clerkUserId already exists, update the existing user instead of creating a new one.
      set: data,
    });

  if (newUser == null) throw new Error('Failed to create new user');

  return newUser;
}

// UPDATE: User
export async function updateUser(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof UserTable.$inferInsert>
) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (updatedUser == null) throw new Error('Failed to update user');

  return updatedUser;
}

// DELETE: User
export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
      email: 'redacted@deleted.com',
      name: 'Deleted User',
      clerkUserId: 'deleted',
      imageUrl: null,
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (deletedUser == null) throw new Error('Failed to delete user');

  return deletedUser;
}
