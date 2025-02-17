This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Schema Management

This section explains how to generate, apply, and visualize database schema changes using Drizzle Kit and Docker.

---

### **1. Generate Database Schema Files**
Generates database schema files based on your Drizzle schema definitions. This ensures that your database schema aligns with your application's data models.

```bash
npm run db:generate
```

---

### **2. Apply Schema Changes**
Applies the generated schema changes to your database. This keeps your database structure updated with the latest schema definitions.

```bash
npm run db:migrate
```

---

### **3. Visualize Schema with Drizzle Studio**
Launches **Drizzle Studio**, a visual tool for exploring and managing your database schema. This is particularly useful for debugging and understanding your database structure.

```bash
npm run db:studio
```

---

### **4. Start the Database with Docker**
Initializes and starts the PostgreSQL database using Docker Compose. This ensures that your database is running and ready for development.

```bash
docker compose up
```
