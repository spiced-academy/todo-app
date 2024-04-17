export async function editTask(taskId: string, taskTitle: string): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle }),
  });

  if (!response.ok) {
    throw new Error('HTTP error ' + response.status);
  }
}