"use client"
import {
  Heading,
  Box,
  Spacer,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Search from "./Searchbar";
import ListsSection from "./ListsSection";
import DarkMode from "./DarkMode";
import FunMode from "./FunMode";
import { usePathname } from "next/navigation";

interface MenuContainerProps {
  totalNumberOfTasks: number
  numberOfDoneTasks: number
  numberOfUpcomingTasks: number
}

const MenuContainer: React.FC<MenuContainerProps> = ({totalNumberOfTasks, numberOfDoneTasks, numberOfUpcomingTasks}) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const pathname = usePathname()

  let activeList = "TaskTango - Home Page"

  switch (pathname) {
    case "/done":
      activeList = "TaskTango - Done"
      break;

    case "/upcoming":
      activeList = "TaskTango - Upcoming"
      break;
  }
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      p={["4", "8"]}
      width={["100%", "300px"]}
      height={["12%", "500px"]}
      borderRadius={["0", "50px"]}
      bg={bg}
      pt={[0, 10]}
      pb={[0, 10]}

    >

      <Flex display={["none", "flex"]} direction="column" gap={["0", "2"]}>
        <Box display={["none", "unset"]}>
          <Heading paddingBottom="10px" as="h5" size="2xl" mb={8}>
            Menu
          </Heading>

          <Search />
        </Box>
        <ListsSection activeList={activeList} totalNumberOfTasks={totalNumberOfTasks} numberOfDoneTasks={numberOfDoneTasks} numberOfUpcomingTasks={numberOfUpcomingTasks}/>
        <Spacer />

        <Box display={["none", "unset"]}>
          <DarkMode />
          <FunMode />
        </Box>
      </Flex>
    </Box>
  );
}

export default MenuContainer;