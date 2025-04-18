# Part I - Convert Todo App from JavaScript to TypeScript

In this project, you will convert a JavaScript-based Todo App to TypeScript. This involves updating configurations, converting files, and ensuring type safety.

## Task

### Set Up TypeScript

-   Add a `tsconfig.json` file to configure TypeScript.
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "typeRoots": ["./types", "./node_modules/@types"],
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
		"baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "next.config.mjs"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
-   Update `.eslintrc.json` to support TypeScript linting.

```
{
  "env": {
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["jest", "@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "next",
    "next/core-web-vitals",
    "plugin:jest/recommended"
  ],
  "rules": {
    "import/no-anonymous-default-export": [
      "error",
      {
        "allowObject": true
      }
    ]
  }
}
```

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
