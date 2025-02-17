import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { CourseTable } from "./course"

export const UserCourseAccessTable = pgTable(
  "user_course_access",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
      // This option mean that if a row (user) in UserTable is deleted,
      // all related rows (user course access and course details) in the UserCourseAccessTable also be automatically deleted.
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "cascade" }),
      // This option mean that if a row (course) in CourseTable is deleted,
      // all related rows (course and users access details) in the UserCourseAccessTable also be automatically deleted.
    createdAt,
    updatedAt,
  },
  t => [primaryKey({ columns: [t.userId, t.courseId] })]
)

export const UserCourseAccessRelationships = relations(
  UserCourseAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseAccessTable.userId],
      references: [UserTable.id],
    }),
    course: one(CourseTable, {
      fields: [UserCourseAccessTable.courseId],
      references: [CourseTable.id],
    }),
  })
)