# Part II - Migrate Todo App from TypeScript to SQL Integration

In this project, you will enhance a TypeScript-based Todo App by integrating an SQL database. This involves updating configurations, connecting to an SQL database, and migrating existing functionalities to work with the database.

## Task

### Set Up SQL Database

-   **Install Dependencies**

    -   Install necessary packages for SQL integration (`pg`, `sequelize`, etc.).
    -   Add required environment variables to the project.

-   **Configure Database**

    -   Create a `database/config.js` file to configure the database connection.
    -   Define database models in the `database/models` directory.

### Update API Handlers

-   **Convert API Handlers**
    -   Update existing API handlers to interact with the SQL database instead of in-memory data.
    -   Example tasks:
        -   Update the `addTask` handler to insert new tasks into the SQL database.
        -   Update the `getTasks` handler to fetch tasks from the SQL database.

### Modify Components

-   **Update Components**
    -   Ensure components fetch and interact with data through the updated API handlers.
    -   Example tasks:
        -   Update the `TaskList` component to display tasks fetched from the SQL database.
        -   Update the `AddTaskInput` component to add tasks using the new API handler.

### Define Types

-   **Update Type Definitions**
    -   Modify type definitions to align with the SQL data models.
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

### Testing

-   **Update Tests**
    -   Update existing tests to work with the SQL database.
    -   Add new tests to cover database interactions.
    -   Example tasks:
        -   Update `TaskList.test.tsx` to mock SQL database calls.
        -   Add tests for new API handlers interacting with the SQL database.
