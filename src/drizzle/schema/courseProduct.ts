import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { CourseTable } from './course';
import { ProductTable } from './product';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';

/**
 * Define the "course_products" table, which represents the many-to-many relationship between courses and products.
 * A course can be linked to multiple products, and a product can contain multiple courses.
 */
export const CourseProductTable = pgTable(
    'course_products', // Table name in the database
    {
        // Define the courseId field which references the CourseTable.
        courseId: uuid()
            .notNull()
            .references(() => CourseTable.id, { onDelete: 'restrict' }), 
            // Prevent deletion of a course if it's associated with any product.
            // Restricting the deletion ensures that courses cannot be removed unless 
            // they are first disassociated from products.

        // Define the productId field which references the ProductTable.
        productId: uuid()
            .notNull()
            .references(() => ProductTable.id, { onDelete: 'cascade' }), 
            // Cascade delete on product: If a product is deleted, the relationship 
            // between that product and its associated courses is automatically removed.
        
        createdAt,
        updatedAt,
    },
    // Set a composite primary key consisting of both courseId and productId 
    // to ensure that each combination of a course and product is unique.
    (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

/**
 * Define relationships for the "course_products" table to link courses and products.
 * These relationships allow for easy navigation between related entities.
 */
export const CourseProductRelationships = relations(
    CourseProductTable, // Define the relationships for the course_products table.
    ({ one }) => ({
        // Define the relationship from the course_products table to the CourseTable.
        course: one(CourseTable, {
            fields: [CourseProductTable.courseId], // The field in CourseProductTable linking to CourseTable.
            references: [CourseTable.id], // The field in CourseTable to which the courseId refers.
        }),
        // Define the relationship from the course_products table to the ProductTable.
        product: one(ProductTable, {
            fields: [CourseProductTable.productId], // The field in CourseProductTable linking to ProductTable.
            references: [ProductTable.id], // The field in ProductTable to which the productId refers.
        }),
    })
);
