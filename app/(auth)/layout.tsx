import { fonts } from "@/lib/fonts";

import '@/styles/global.css'
import { SessionProvider } from "@/providers/session-provider";
import { ChakraProvider } from "@/providers/chacra-provider";

export default async function RootLayout({ children }: { children: React.ReactNode, navigation: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fonts.rubik.className}>
        <SessionProvider>
            <ChakraProvider>
              {children}
            </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
