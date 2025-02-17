import { integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { CourseTable } from './course';
import { relations } from 'drizzle-orm';
import { LessonTable } from './lesson';

export const courseSectionStatuses = ['public', 'private'] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]; // type will be only 'public' | 'private'
export const courseSectionStatusEnum = pgEnum(
    'course_section_status',
    courseSectionStatuses
);

export const CourseSectionTable = pgTable('course_sections', {
    id,
    name: text().notNull(),
    status: courseSectionStatusEnum().notNull().default('private'),
    order: integer().notNull(),
    courseId: uuid()
        .notNull()
        .references(() => CourseTable.id, { onDelete: 'cascade' }),
    // This option means that if a row in the CourseTable is deleted,
    // all related rows in the CourseSectionTable will also be automatically deleted
    createdAt,
    updatedAt,
});

export const CourseSectionsRelationships = relations(
    CourseSectionTable,
    ({ one, many }) => ({
        course: one(CourseTable, {
            fields: [CourseSectionTable.courseId],
            references: [CourseTable.id],
        }),
        lessons: many(LessonTable)
    })
);
