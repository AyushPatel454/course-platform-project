# Database Schema Documentation

## 📚 Overview
This schema defines the structure of an educational platform database. It supports:
- **Course Management:** Organizes courses into sections and lessons.
- **Product-Course Relationships:** Links courses to purchasable products.
- **User Access Control:** Manages user access to courses and lessons.
- **Purchase Tracking:** Records purchases and integrates with Stripe.
- **Progress Tracking:** Tracks user progress through lessons.
---
- `Product` have `courses`.
- `Courses` have `sections`.
- `Sections` have `lessons`.
- `User`
- `User` have `UserCourseAccess`
- `User` have `UserLessonCompleteTable`

## 🌐 Entity Relationships
```plaintext
- Product → Courses (Many-to-Many via CourseProductTable)
- Course → Sections (One-to-Many)
- Section → Lessons (One-to-Many)
- User → UserCourseAccess (One-to-Many)
- User → UserLessonComplete (One-to-Many)
```

## 📋 Tables

### 1. **Courses (`courses`)**
**Purpose:** Stores course information.

| Column        | Type        | Constraints                     | Description                              |
|---------------|-------------|---------------------------------|------------------------------------------|
| `id`          | `UUID`      | `PRIMARY KEY`                   | Unique course identifier                 |
| `name`        | `TEXT`      | `NOT NULL`                      | Course title                             |
| `description` | `TEXT`      | `NOT NULL`                      | Detailed course description              |
| `createdAt`   | `TIMESTAMP` | `NOT NULL`                      | Timestamp of creation                    |
| `updatedAt`   | `TIMESTAMP` | `NOT NULL`                      | Timestamp of last update                 |

**Relationships:**
- **One-to-Many:** `Course → CourseProductTable`
- **One-to-Many:** `Course → UserCourseAccessTable`

---

### 2. **Course Products (`course_products`)**
**Purpose:** Manages many-to-many relationships between courses and products.

| Column        | Type        | Constraints                                      | Description                              |
|---------------|-------------|--------------------------------------------------|------------------------------------------|
| `courseId`    | `UUID`      | `FOREIGN KEY (courses.id), NOT NULL, RESTRICT ON DELETE` | Links to course                         |
| `productId`   | `UUID`      | `FOREIGN KEY (products.id), NOT NULL, CASCADE ON DELETE` | Links to product                        |
| `createdAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-One:** `CourseProduct → Course`
- **One-to-One:** `CourseProduct → Product`

---

### 3. **Course Sections (`course_sections`)**
**Purpose:** Organizes course content into sections.

| Column        | Type        | Constraints                                      | Description                              |
|---------------|-------------|--------------------------------------------------|------------------------------------------|
| `id`          | `UUID`      | `PRIMARY KEY`                                   | Unique section identifier                |
| `name`        | `TEXT`      | `NOT NULL`                                      | Section name                             |
| `status`      | `ENUM`      | `NOT NULL, DEFAULT 'private'`                   | Visibility (`public` or `private`)       |
| `order`       | `INTEGER`   | `NOT NULL`                                      | Display order within course              |
| `courseId`    | `UUID`      | `FOREIGN KEY (courses.id), NOT NULL, CASCADE ON DELETE` | Links to course                         |
| `createdAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-One:** `CourseSection → Course`
- **One-to-Many:** `CourseSection → Lessons`

---

### 4. **Lessons (`lessons`)**
**Purpose:** Represents individual learning units.

| Column           | Type        | Constraints                                      | Description                              |
|------------------|-------------|--------------------------------------------------|------------------------------------------|
| `id`             | `UUID`      | `PRIMARY KEY`                                   | Unique lesson identifier                 |
| `name`           | `TEXT`      | `NOT NULL`                                      | Lesson title                             |
| `description`    | `TEXT`      |                                                  | Lesson description                       |
| `youtubeVideoId` | `TEXT`      | `NOT NULL`                                      | Embedded YouTube video ID                |
| `order`          | `INTEGER`   | `NOT NULL`                                      | Display order within section             |
| `status`         | `ENUM`      | `NOT NULL, DEFAULT 'private'`                   | Visibility (`public`, `private`, `preview`) |
| `sectionId`      | `UUID`      | `FOREIGN KEY (course_sections.id), NOT NULL, CASCADE ON DELETE` | Links to section                        |
| `createdAt`      | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`      | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-One:** `Lesson → CourseSection`
- **One-to-Many:** `Lesson → UserLessonCompleteTable`

---

### 5. **Products (`products`)**
**Purpose:** Manages purchasable products.

| Column            | Type        | Constraints                                      | Description                              |
|-------------------|-------------|--------------------------------------------------|------------------------------------------|
| `id`              | `UUID`      | `PRIMARY KEY`                                   | Unique product identifier                |
| `name`            | `TEXT`      | `NOT NULL`                                      | Product name                             |
| `description`     | `TEXT`      | `NOT NULL`                                      | Product description                      |
| `imageUrl`        | `TEXT`      | `NOT NULL`                                      | URL of product image                     |
| `priceInDollars`  | `INTEGER`   | `NOT NULL`                                      | Product price in dollars                 |
| `status`          | `ENUM`      | `NOT NULL, DEFAULT 'private'`                   | Visibility (`public` or `private`)       |
| `createdAt`       | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`       | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-Many:** `Product → CourseProductTable`

---

### 6. **Purchases (`purchases`)**
**Purpose:** Tracks user purchases.

| Column               | Type        | Constraints                                      | Description                              |
|----------------------|-------------|--------------------------------------------------|------------------------------------------|
| `id`                 | `UUID`      | `PRIMARY KEY`                                   | Unique purchase identifier               |
| `pricePaidInCents`   | `INTEGER`   | `NOT NULL`                                      | Purchase amount in cents                 |
| `productDetails`     | `JSONB`     | `NOT NULL`                                      | Snapshot of product details              |
| `userId`             | `UUID`      | `FOREIGN KEY (users.id), NOT NULL, RESTRICT ON DELETE` | Links to user                           |
| `productId`          | `UUID`      | `FOREIGN KEY (products.id), NOT NULL, RESTRICT ON DELETE` | Links to product                        |
| `stripeSessionId`    | `TEXT`      | `NOT NULL, UNIQUE`                              | Stripe payment session ID                |
| `refundedAt`         | `TIMESTAMP` |                                                  | Timestamp of refund (if applicable)      |
| `createdAt`          | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`          | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-One:** `Purchase → User`
- **One-to-One:** `Purchase → Product`

---

### 7. **Users (`users`)**
**Purpose:** Manages platform users.

| Column        | Type        | Constraints                                      | Description                              |
|---------------|-------------|--------------------------------------------------|------------------------------------------|
| `id`          | `UUID`      | `PRIMARY KEY`                                   | Unique user identifier                   |
| `clerkUserId` | `TEXT`      | `NOT NULL, UNIQUE`                              | External authentication ID (Clerk.io)    |
| `email`       | `TEXT`      | `NOT NULL`                                      | User's email address                     |
| `name`        | `TEXT`      | `NOT NULL`                                      | User's display name                      |
| `role`        | `ENUM`      | `NOT NULL, DEFAULT 'user'`                      | User role (`user` or `admin`)            |
| `imageUrl`    | `TEXT`      |                                                  | URL of user's profile image              |
| `deletedAt`   | `TIMESTAMP` |                                                  | Timestamp of soft deletion               |
| `createdAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-Many:** `User → UserCourseAccessTable`
- **One-to-Many:** `User → UserLessonCompleteTable`

---

### 8. **User Course Access (`user_course_access`)**
**Purpose:** Tracks user access to courses.

| Column        | Type        | Constraints                                      | Description                              |
|---------------|-------------|--------------------------------------------------|------------------------------------------|
| `userId`      | `UUID`      | `FOREIGN KEY (users.id), NOT NULL, CASCADE ON DELETE` | Links to user                           |
| `courseId`    | `UUID`      | `FOREIGN KEY (courses.id), NOT NULL, CASCADE ON DELETE` | Links to course                         |
| `createdAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of creation                    |
| `updatedAt`   | `TIMESTAMP` | `NOT NULL`                                      | Timestamp of last update                 |

**Relationships:**
- **One-to-One:** `UserCourseAccess → User`
- **One-to-One:** `UserCourseAccess → Course`