"use client"
import {
  Input,
  InputLeftElement,
  InputGroup,
  CloseButton,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useTaskStore } from "@/store";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Search() {
  const setSearchTerm = useTaskStore((state) => state.setSearchTerm);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <form style={{width: "100px"}} onSubmit={(e: FormEvent) => e.preventDefault()}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="black" />
        </InputLeftElement>
        <Input
          value={inputValue}
          onChange={handleSearchChange}
          id="search"
          name="search"
          type="text"
          aria-label="search"
          placeholder="Search..."
          _placeholder={{ opacity: 1, color: "gray.500" }}
          color="gray.500"
          bg="gray.100"
          focusBorderColor="teal.400"
          borderRadius="full"
        />
        {inputValue ? (
          <InputRightElement width="4.5rem">
            <CloseButton
              color="gray.500"
              onClick={handleResetSearch}
            ></CloseButton>
          </InputRightElement>
        ) : (
          ""
        )}
      </InputGroup>
    </form>
  );
}