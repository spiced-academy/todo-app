"use client"
import { FormEvent } from 'react';
import { useSWRConfig } from 'swr';

import { AddIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import AddTask from './Functions/addTask';

interface AddTaskInputProps {
  afterSubmit?: () => void;
}

export default function AddTaskInput({ afterSubmit }: AddTaskInputProps) {
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const taskTitle = Object.fromEntries(formData.entries());

    try {
      const title = taskTitle.title as string;
      await AddTask(title);
      mutate("/api/tasks");

      const inputElement = form.elements.namedItem('title') as HTMLInputElement;

      inputElement && inputElement.focus();

      form.reset();

      // with this, we can let the caller know that submit has been successfully handled
      if (afterSubmit && typeof afterSubmit === "function") {
        afterSubmit();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      mutate("/api/tasks");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AddIcon color="gray.300" />
        </InputLeftElement>
        <Input
          aria-label="add New Task"
          focusBorderColor="teal.400"
          autoFocus
          id="title"
          name="title"
          type="text"
          placeholder="Add new task"
        />
      </InputGroup>
    </form>
  );
}