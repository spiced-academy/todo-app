## About The Project

Task Tango is a simple to-do app designed for the Advanced Web Development Bootcamp. This project serves as an evolving learning platform where new features are added with each new topic covered in the bootcamp.

### Initial Features

-   Basic "TODO list" functionality
-   Add, edit, and delete tasks
-   Mark tasks as complete or incomplete
-   Persistent data storage

### Future Enhancements

Task Tango evolves alongside your learning journey, incorporating new features and technologies with each release branch:

-   **Part I - TypeScript**: Convert the project from JavaScript to TypeScript for type safety and improved developer experience.
-   **Part II - SQL**: Integrate SQL databases for robust and scalable data management.
-   **Part III - App Router**: Implement an advanced app router for better navigation and user experience
-   **Part IV - Server Components**: Utilize server components to optimize performance and server-side rendering.
-   **Part V - Prisma**: Use Prisma for database ORM to simplify data access and management.
-   **Part VI - NextAuth**: Add authentication and authorization features using NextAuth.
-   **Part VII - Docker**: Containerize the application using Docker for consistent and portable environments.
-   **Part VIII - SSE**: Implement Server-Sent Events (SSE) for real-time updates and notifications.

# Part I - Convert Todo App from JavaScript to TypeScript

In this project, you will convert a JavaScript-based Todo App to TypeScript. This involves updating configurations, converting files, and ensuring type safety.

## Task

### Set Up TypeScript

-   Add a `tsconfig.json` file to configure TypeScript.
-   Update `.eslintrc.json` to support TypeScript linting.

### Convert Files

-   Change the file extensions of all `.js` and `.jsx` files to `.ts` and `.tsx` respectively.

### Define Types

-   Create a `types/global.d.ts` file for global type definitions.
-   Add prop and state type definitions to all components.

### Convert Components

-   Update all components from JavaScript to TypeScript, ensuring proper type annotations.
-   Example tasks:
    -   Convert `AddTaskInput` component to TypeScript.
    -   Convert `TaskList` component to TypeScript.

### Update Utility Functions

-   Convert utility functions to TypeScript, adding type annotations for parameters and return types.
-   Example task: Convert the `addTask` function to TypeScript.

### Update API Handlers

-   Convert API handlers to TypeScript.
-   Example task: Convert the `tasks/index` API handler to TypeScript.

### Convert Store and Theme

-   Convert the store configuration and theme files to TypeScript.

### Convert Tests

-   Update test files to TypeScript.
-   Example task: Convert `AddTaskInput.test` file to TypeScript.

### Ensure Type Safety

-   Update all import paths to reflect the new `.ts` and `.tsx` extensions.
-   Resolve any type errors by refining type definitions and using TypeScript's type-checking features.

## Development

### Local Development

To run project commands locally, you need to install the dependencies using `npm i` first.

You can then use the following commands:

-   `npm run dev` to start the development server.
-   `npm run build` to create a production build.
-   `npm run start` to start the production build.
-   `npm run test` to run the tests in watch mode.

> 💡 This project requires a bundler. You can use `npm run dev` to start the development server. You can then view the project in the browser at `http://localhost:3000`. The Live Preview Extension for Visual Studio Code will **not** work for this project.
