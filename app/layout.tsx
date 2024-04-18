import { SWRProvider } from "@/providers/swr-provider";
import { ChakraProvider } from "@/providers/chacra-provider";
import { Box } from "@chakra-ui/react";
import { fonts } from "@/lib/fonts";
import MenuContainer from "@/components/Navigation/MenuContainer";
import {getNumberOfTasksByState} from "@/services/TaskService";

import '@/styles/global.css'

export default async function RootLayout({ children }: { children: React.ReactNode, navigation: React.ReactNode }) {
    const totalNumberOfTasks = await getNumberOfTasksByState()
    const numberOfDoneTasks = await getNumberOfTasksByState("done")
    const numberOfUpcomingTasks = await getNumberOfTasksByState("upcoming")
  return (
    <html lang="en">
      <body className={fonts.rubik.className}>
        <SWRProvider>
          <ChakraProvider>
            <Box
              h="100%"
              w="100%"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              display={{ base: "flex", md: "flex" }} // flex layout on medium and larger screens
              flexDirection={{ base: "column-reverse", md: "row" }} // column layout on smaller screens
              gap={["0px", "8px"]}
            >
              <MenuContainer totalNumberOfTasks={totalNumberOfTasks} numberOfDoneTasks={numberOfDoneTasks} numberOfUpcomingTasks={numberOfUpcomingTasks} />
              {children}
            </Box>
          </ChakraProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
