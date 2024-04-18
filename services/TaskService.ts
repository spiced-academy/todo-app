import { revalidatePath } from "next/cache";
import { pool } from "@/db/pg_pool";

export const _revalidatePaths = () => {
    revalidatePath("/[[..taskState]]", "layout")
}

export const createTask = async (title: string): Promise<Task> => {
    "use server";
    const result = await pool.query("INSERT INTO \"Tasks\" (title) VALUES ($1) RETURNING *", [title]);
    _revalidatePaths()
    return result.rows[0] as Task
}

export const getTasks = async () => {
    "use server";
    const result = await pool.query<Task>("SELECT * FROM \"Tasks\" ORDER BY created_at DESC");
    return result.rows;
}

export const getTasksByState = async (taskState: TaskState | undefined): Promise<Task[]> => {
    if (taskState === "done") {
        return getDoneTasks()
    }

    if (taskState === "upcoming") {
        return getUpcomingTasks()
    }

    return getTasks()
}

export const getUpcomingTasks = async () => {
    "use server";
    const result = await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE completed = FALSE ORDER BY created_at DESC");
    return result.rows;
}

export const getDoneTasks = async () => {
    "use server";
    const result = await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE completed = TRUE ORDER BY created_at DESC");
    return result.rows;
}

export const completeTask = async (taskId: string): Promise<Task> => {
    "use server";
    const task = (await pool.query('SELECT * FROM "Tasks" WHERE id = $1', [taskId]))
        .rows[0];
    if (!task) {
        throw new Error("Task not found!")
    }

    const result = await pool.query('UPDATE "Tasks" SET completed = $1 WHERE id = $2 RETURNING *', [
        !task.completed,
        taskId,
    ]);
    _revalidatePaths()

    return result.rows[0] as Task;
}

export const deleteTask = async (taskId: string): Promise<void> => {
    "use server"
    await pool.query('DELETE FROM "Tasks" WHERE id = $1', [taskId])
    _revalidatePaths()
}

export const updateTask = async (taskId: string, title: string): Promise<Task> => {
    "use server"
    const result = await pool.query('UPDATE "Tasks" SET title = $1 WHERE id = $2 RETURNING *', [
        title,
        taskId]);
    _revalidatePaths()
    return result.rows[0]
}
export const getNumberOfTasksByState = async (state?: TaskState | undefined): Promise<number> => {
    "use server"
    const result = !state ? await pool.query('SELECT COUNT(*) FROM "Tasks"') : await pool.query('SELECT COUNT(*) FROM "Tasks" WHERE completed = $1', [state === "done"])

    return result.rows[0].count
}


