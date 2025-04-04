# Migrate Todo App to use Prisma as the ORM 

In this project, you will enhance a TypeScript-based Todo App by integrating Prisma. This involves installing required dependencies, updating configurations and migrating existing functionalities to work with ORM/Prisma. 

## 🛠️ **Setting Up Prisma in a Next.js Project with PostgreSQL**

## 1️⃣ Install Dependencies

Inside a Next Project (create a new project if you don't have one already) Run the following command to install Prisma and PostgreSQL dependencies:

```bash
npm install @prisma/client
npm install --save-dev prisma
```

## 2️⃣ Initialize Prisma

Run the following command to create the Prisma configuration files:

```
npx prisma init
```
This will generate a prisma/schema.prisma file and a .env file where you will configure your database connection.

## 3️⃣ Configure PostgreSQL Connection

Open the **.env** file and update the `DATABASE_URL` to your PostgreSQL database:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```
💡 Replace `user`, `password`, and `mydatabase` with your actual database credentials. 

## 4️⃣ Define Your Database Schema

a. If you already have your database you can use `npx prisma db pull` and this will turn your database schema into a Prisma schema. 

Or 

b. Manually modify `prisma/schema.prisma` to define your models that represent your tables. 

Example
```
model Tasks {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title      String   @db.VarChar
  completed  Boolean? @default(false)
  created_at DateTime @default(now()) @db.Timestamptz(6)
  updated_at DateTime @default(now()) @db.Timestamptz(6)
}
```

## 5️⃣ Run Migrations to Update the Database

This step is required only if you made updates to the database or want to create a new one. 
After defining the schema, run the following command to create the database tables:

```bash
npx prisma migrate dev --name init
```
✅ This applies the schema changes and creates the necessary tables in PostgreSQL.

## 6️⃣ Generate the Prisma Client

Generate the Prisma Client, which allows Next.js to interact with the database:

```bash
npx prisma generate
```

## 🎯 Now Let's use Prisma in our api and pages

## 1️⃣ Update functions at (`services/TaskService.ts`)

Replace the usage of `pool` from `pg_pool` to use `PrismaClient` instead. 

## 2️⃣ Clean the unused code 

Remove the `pg_pool` related code and files. 