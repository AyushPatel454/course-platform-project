import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { CourseProductTable } from './courseProduct';
import { UserCourseAccessTable } from './userCourseAccess';

export const CourseTable = pgTable('courses', {
    id,
    name: text().notNull(),
    description: text().notNull(),
    createdAt,
    updatedAt,
});

// Defines relationships for the CourseTable
export const CourseRelationships = relations(CourseTable, ({ many }) => ({
    // - courseProducts: One-to-many relationship with CourseProductTable, allowing a course
    //   to be associated with multiple products through the CourseProductTable join table
    courseProducts: many(CourseProductTable),
    // - userCourseAccess: One-to-many relationship with UserCourseAccessTable, allowing a user
    // to be associated with multiple products through the UserCourseAccessTable join tables
    userCourseAccess: many(UserCourseAccessTable),
}));
