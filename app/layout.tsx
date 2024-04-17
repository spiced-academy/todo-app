import { SWRProvider } from "@/providers/swr-provider";
import { ChakraProvider } from "@/providers/chacra-provider";
import { fonts } from "@/lib/fonts";

import '@/styles/global.css'

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
