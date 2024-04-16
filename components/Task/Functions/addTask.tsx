export default async function AddTask(taskTitle: string): Promise<void> {
  console.log(taskTitle);
  try {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
  } catch (error) {
    console.error("ERROR !!", error);
  }
}