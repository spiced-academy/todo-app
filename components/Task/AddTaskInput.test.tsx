import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTaskInput from "./AddTaskInput";

test("renders a input field to add new Tasks", () => {
  const createTask = jest.fn()
  render(<AddTaskInput createTask={createTask}/>);
  const input: HTMLElement = screen.getByRole("textbox", { name: /add New Task/i });

  expect(input).toBeInTheDocument();
});