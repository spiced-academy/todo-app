import { revalidatePath } from "next/cache";
import prisma from "@/db/client";
import { Task } from "@prisma/client";

export const _revalidatePaths = () => {
    revalidatePath("/[[..taskState]]", "layout")
}

export const createTask = async (title: string): Promise<Task> => {
    "use server";
    const result = await prisma.task.create({
        data: {
            title
        }
    })
    _revalidatePaths()
    return result
}

export const getTasks = async () => {
    "use server";
    return prisma.task.findMany({
        orderBy: {
            created_at: "desc"
        }
    })
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
    return prisma.task.findMany({
        where: {
            completed: false
        },
        orderBy: {
            created_at: "desc"
        }
    })
}

export const getDoneTasks = async () => {
    "use server";
    return prisma.task.findMany({
        where: {
            completed: true
        },
        orderBy: {
            created_at: "desc"
        }
    })
}

export const completeTask = async (taskId: string): Promise<Task> => {
    "use server";
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })

    if (!task) {
        throw new Error("Task not found!")
    }
    const updatedTask =  prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            completed: !task.completed
        }
    })
    _revalidatePaths()
    return updatedTask
}

export const deleteTask = async (taskId: string): Promise<void> => {
    "use server"
    await prisma.task.delete({
        where: {
            id: taskId
        }
    })
    _revalidatePaths()
}

export const updateTask = async (taskId: string, title: string): Promise<Task> => {
    "use server"
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            title
        }
    })
    _revalidatePaths()
    return updatedTask
}

export const getNumberOfTasksByState = async (state?: TaskState | undefined): Promise<number> => {
    "use server"
    return await prisma.task.count(!state ? undefined : {
        where: {
            completed: state === "done"
        }
    })
}


