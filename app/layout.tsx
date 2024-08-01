import { fonts } from "@/lib/fonts";

import '@/styles/global.css'
import { ChakraProvider } from "@/providers/chacra-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="light" lang="en">
      <body className={fonts.rubik.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
