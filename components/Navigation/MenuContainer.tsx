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

const MenuContainer: React.FC = () => {
  const bg = useColorModeValue("gray.200", "gray.700");

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
        <ListsSection />
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