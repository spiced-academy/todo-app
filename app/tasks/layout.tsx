import '@/styles/global.css';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/nextauth/authOptions';
import Header from '@/components/Header/Header';
import MenuContainer from '@/components/Navigation/MenuContainer';
import { getNumberOfTasksByState } from '@/services/TaskService';
import { Box } from '@chakra-ui/react';

export default async function RootLayout({ children }: { children: React.ReactNode, navigation: React.ReactNode }) {
  const totalNumberOfTasks = await getNumberOfTasksByState()
  const numberOfDoneTasks = await getNumberOfTasksByState("done")
  const numberOfUpcomingTasks = await getNumberOfTasksByState("upcoming")
  const session = await getServerSession(authOptions)
  return (<>
    <Header session={session}></Header>
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
  </>
  );
}
