# 🕰️ Incremental Migration to Next.js App Router ✨

The **best way** to convert your application from the Pages Router to the App Router is to do it *iteratively*.  
Think small, focused steps — and test after each one. ✅ Incremental, test-driven migration is the name of the game!

Luckily, Next.js lets the `pages` and `app` directories **coexist**, so we can take advantage of that for a smooth transition.

---

## 🔷 Step 1: Create the `/app` Folder

Let’s begin by creating a new `app` directory at the root of your project.

---

## 🔷 Step 2: Move the `/done` Page

Migrate `pages/done.tsx` to `app/done/page.tsx`.  
Then, test it by visiting `/done` in the browser.

💡 You’ll notice the content is there, but **the styles are all messed up**.  
If you check your code editor, you’ll see that `app/layout.tsx` was auto-generated for you. However, it's not yet aligned with the styling and layout you had set up in `_app.tsx`. Time to fix that in the next step!

## 🔷 Step 3: Recreate the Layout in the App Router

Let’s clean up first!

Go to `pages/_app.tsx` and remove this block:

```tsx
<style jsx global>
  {`
    :root {
      --font-rubik: ${fonts.rubik.style.fontFamily};
    }

    body,
    html {
      height: 100%;
    }
  `}
</style>
```

Now go to `globals.css` and add the following:

- Add `--font-rubik: '__Rubik_b539cb', '__Rubik_Fallback_b539cb';` under the `:root` selector.
- Add `height: 100%;` to the `html`, `body` styles.

---

💡 **But here’s the catch:**

Since `layout.tsx` is a **server component by default**, we **cannot use ChakraProvider or SWRConfig directly** inside it because:

- `ChakraProvider` uses React context and DOM APIs → 🚫 server-incompatible.
- `SWRConfig` passes a function (`fetcher`) → 🚫 cannot serialize.

---

So what do we do?  
We move them into their own **client providers**!

---

### 📦 Create `providers/chakra-provider.tsx`
```tsx
'use client';
import { ChakraProvider as CP, theme } from "@chakra-ui/react";
import React, { ReactNode } from 'react';

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return <CP theme={theme}>{children}</CP>;
};
```

### 📦 Create `providers/swr-provider.tsx`
```tsx
'use client';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export const SWRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
```

### 🎨 Update `app/layout.tsx`
```tsx
import { SWRProvider } from "@/providers/swr-provider";
import { ChakraProvider } from "@/providers/chakra-provider";
import { fonts } from "@/lib/fonts";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fonts.rubik.className}>
        <SWRProvider>
          <ChakraProvider>
            <main>{children}</main>
          </ChakraProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
```
Now refresh your browser — you should see your done page rendered correctly and styled just as before. ✨


## 🔷 Step 4: Migrate the Remaining Pages

- Move the `upcoming` page next. If it uses hooks (e.g., Zustand, SWR), make sure to add `'use client'` at the top.
- For the **404 page**, name it `not-found.tsx` and place it in the `app/` folder.  
  This is the special naming convention required by Next.js to handle unknown routes.  
  Since Chakra is used here, you’ll also likely need `'use client';` at the top.
- For the `index.tsx` page, move it to `app/page.tsx`.  
  Because it uses hooks, mark it as a client component with `'use client';`.

✨ Once done, you can **safely delete** both `_app.tsx` and `_document.tsx`,  
and then give your app a full browser test. Everything should still be working beautifully.

---

## 🔷 Step 5: Migrate the API Routes to App Router

Let’s now move over the `api` folder.

Start with:

- Move `pages/api/status/done.tsx` → `app/api/status/done/route.tsx`.

Just like `page.tsx` is the naming convention for pages,  
`route.tsx` is the naming convention for **API routes** in the App Router.

😬 **But when you try this, you’ll get an error like:**
```
⨯ Detected default export in 'app/api/status/done/route.tsx'.
⨯ No HTTP methods exported in 'route.tsx'. Export a named export for each HTTP method.
```

That’s because in the App Router, you need to **export HTTP methods (GET, POST, etc.) as named exports**,  
and you must use `NextRequest` and `NextResponse` from `next/server` instead of the `NextApi*` types.

Here’s the fixed version:

```tsx
import { pool } from '@/db/pg_pool';
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = (await pool.query<Task>('SELECT * FROM "Tasks" WHERE completed = true ORDER BY created_at DESC')).rows;
  return NextResponse.json(tasks);
}
```
🎯 Now repeat the same for your remaining API routes!


That’s it! Now you can safely delete the `pages` folder. You've now walked through a complete, graceful, and modern migration from Pages Router to App Router,
one step at a time — with styles, APIs, and all the bells and whistles intact. 🛠️✨
