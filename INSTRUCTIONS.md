# Part II - Migrate Todo App from No SQL to SQL Integration

In this project, you will enhance a TypeScript-based Todo App by integrating an SQL database. This involves updating configurations, connecting to an SQL database, and migrating existing functionalities to work with the database.

## Task

### Set Up SQL Database

-   **Install Dependencies**

    -   Install necessary packages for SQL integration (`pg`, `sequelize`, etc.).
    -   Add required environment variables to the project.

### Configure Database

1. **Create `pg_pool.js` in the `db` Folder**

    This file will configure your PostgreSQL connection pool using environment variables.

    ```javascript
    import pg from "pg";
    require("dotenv").config();

    export const pool = new pg.Pool({
        host: process.env.PG_HOST || "localhost",
        user: process.env.PG_USER || "postgres",
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
    });
    ```

2. **Define the Structure of the `Tasks` Table**

    You have two options:

    - **Option 1: Create the table directly using SQL**

        If you prefer to define the table structure manually, you can use the following SQL command:

        ```sql
        CREATE TABLE "Tasks" (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

    - **Option 2: Restore the Database from the Dump File**

        If you have a database dump file (`todoapp.dump`), you can use it to restore the database.

        ```bash
        pg_restore -U postgres -d todoapp -1 todoapp.dump
        ```

### Update API Handlers

-   **Convert API Handlers**
    -   Update existing API handlers to interact with the SQL database instead of MongoDB methods.
    -   Example tasks:
        -   Update the endpoint for adding a new task to insert tasks into the SQL database.
        -   Update the endpoint for fetching tasks to retrieve tasks from the SQL database.

### Modify Components

-   **Update Components**
    -   Ensure components fetch and interact with data through the updated API handlers.
    -   Example tasks:
        -   Update the `TaskList` component to display tasks fetched from the SQL database.
        -   Update the `AddTaskInput` component to add tasks using the new API handler.

### Define Types

-   **Update Type Definitions**
    -   Modify type definitions to align with the SQL data models. (e.g. `_id` might now be `id`)
    -   Example tasks:
        -   Update types in `types/global.d.ts` to reflect the SQL data structure.
        -   Ensure all components and utility functions use the updated types.

### Implement Database Migrations

-   **Set Up Migrations**
    -   Create migration scripts to set up the initial database schema.
    -   Add scripts for future database changes.
    -   Example tasks:
        -   Create an initial migration to create the `tasks` table.
        -   Add a migration script to modify the `tasks` table if needed.

### Ensure Data Integrity

-   **Validate Data**
    -   Ensure that all data interactions maintain data integrity and consistency.
    -   Example tasks:
        -   Add validation in API handlers to ensure valid data is inserted into the database.
        -   Implement error handling to manage database errors gracefully.
