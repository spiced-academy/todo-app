import { Page, Locator } from "@playwright/test";
import randomItem from "./utils/utils";
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("https://tasktango.vercel.app/");
  await expect(page).toHaveTitle("TaskTango - Home Page");
});

test.describe("New Todo", () => {
  test("Add a task and verify it appears in the list", async ({ page }: { page: Page }) => {
    const newTaskInput: Locator = page.locator('input[placeholder="Add new task"]');
    await newTaskInput.waitFor();
    const todoText: string = randomItem();
    await newTaskInput.fill(todoText);
    await newTaskInput.press("Enter");

    const ListItem: Locator = page.locator('listitem').filter({ hasText: todoText });
    const itemCheckbox: Locator = ListItem.locator(".chakra-checkbox__control");

    await itemCheckbox.first().click();
    expect(itemCheckbox).toBeTruthy();

    await expect(page.getByText("Task Done")).toBeVisible();
  });

  test("Add a task and Delete it and verify it appears in the list", async ({ page }: { page: Page }) => {
    const newTaskInput: Locator = page.locator('input[placeholder="Add new task"]');
    await newTaskInput.waitFor();
    const todoText2: string = randomItem();
    await newTaskInput.fill(todoText2);
    await newTaskInput.press("Enter");

    const ListItem2: Locator = page.locator('listitem').filter({ hasText: todoText2 });

    await ListItem2.waitFor();

    const itemDeleteBtn: Locator = ListItem2.locator('button[aria-label="Delete a task"]');

    await itemDeleteBtn.waitFor();
    await itemDeleteBtn.first().click();

    await expect(page.getByText("Task deleted")).toBeInViewport();
  });
});