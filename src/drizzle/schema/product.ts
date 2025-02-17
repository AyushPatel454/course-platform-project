import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { CourseProductTable } from './courseProduct';

export const productStatuses = ['public', 'private'] as const;
export type ProductStatus = (typeof productStatuses)[number]; // type will be only 'public' | 'private'
export const productStatusEnum = pgEnum('product_status', productStatuses);

export const ProductTable = pgTable('products', {
    id,
    name: text().notNull(),
    description: text().notNull(),
    imageUrl: text().notNull(),
    priceInDollars: integer().notNull(),
    status: productStatusEnum().notNull().default('private'),
    createdAt,
    updatedAt,
});

// Defines relationships for the ProductTable
export const ProductRelationships = relations(ProductTable, ({ many }) => ({
    // - courseProducts: One-to-many relationship with CourseProductTable, allowing a product
    //   to be associated with multiple courses through the CourseProductTable join table
    courseProducts: many(CourseProductTable),
}));
