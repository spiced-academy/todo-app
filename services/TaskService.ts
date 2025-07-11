import prisma from "@/db/client";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from '@/nextauth/authOptions';
import { sendMessage, broadcastMessage } from "./SseService";

export const getNewTasksByUserId = async (userId: string): Promise<Task[]> => {
    "use server";
    return prisma.task.findMany({
        where: {
            user_id: userId,
            new: true
        }
    })
}

export const isPublicTask = async (taskId: string): Promise<boolean> => {
    "use server";
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
    return task?.user_id === null
}

export const assignTaskToUser = async (taskId: string, userId: string): Promise<Task> => {
    "use server";
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
    if (!task) {
        throw new Error("Task not found!")
    }

    const formerUserId = task.user_id || "null"
    try {
        const result = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                user_id: userId === "null" ? null : userId,
                new: true
            }
        })

        if (userId !== "null") {
            sendMessage(userId, { type: "tasks", data: await getTasksByUserId(userId, true) })
        }
        if (formerUserId !== "null") {
            sendMessage(formerUserId, { type: "tasks", data: await getTasksByUserId(formerUserId, true) })
        }
        if (formerUserId === "null" || userId === "null") {
            broadcastMessage({ type: "publicTasks", data: await getPublicTasks() })
        }
        return result
    } catch (error) {
        console.error(error)
        throw new Error("Error assigning task to user!")
    }
}

export const createTask = async (title: string): Promise<Task> => {
    "use server";
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("You must be logged in to create a task!")
    }
    const result = await prisma.task.create({
        data: {
            title,
            user_id: session.user.id
        }
    })
    return result
}

export const getPublicTasks = async () => {
    "use server";
    return getTasksByUserId("null", true)
}

export const getTasksOfCurrentUser = async (includePublicTasks = true) => {
    "use server";
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        throw new Error("You must be logged in to get tasks!")
    }

    return getTasksByUserId(session.user.id, includePublicTasks)
}

export const getTasksByUserId = async (userId: string, includePublicTasks: boolean): Promise<Task[]> => {
    const where = includePublicTasks ? { OR: [{ user_id: userId }, { user_id: null }] } : { user_id: userId }

    return prisma.task.findMany({
        where,
        orderBy: {
            created_at: "desc"
        }
    })
}

export const getTasksByState = async (taskState: TaskState | undefined): Promise<Task[]> => {
    "use server";
    if (taskState === "done") {
        return getDoneTasks()
    }

    if (taskState === "upcoming") {
        return getUpcomingTasks()
    }

    return getTasksOfCurrentUser()
}

export const getUpcomingTasks = async () => {
    "use server";
    const session = await getServerSession(authOptions)
    return prisma.task.findMany({
        where: {
            completed: false,
            user_id: session?.user.id
        },
        orderBy: {
            created_at: "desc"
        }
    })
}

export const getDoneTasks = async () => {
    "use server";
    const session = await getServerSession(authOptions)
    return prisma.task.findMany({
        where: {
            completed: true,
            user_id: session?.user.id
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
    const updatedTask = prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            completed: !task.completed
        }
    })
    return updatedTask
}

export const deleteTask = async (taskId: string): Promise<void> => {
    "use server"
    const isPublic = await isPublicTask(taskId)
    await prisma.task.delete({
        where: {
            id: taskId
        }
    })

    if (isPublic) {
        broadcastMessage({ type: "taskDeleted", data: taskId })
    }
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
    return updatedTask
}

export const getNumberOfTasksByState = async (state?: TaskState | undefined): Promise<number> => {
    "use server"
    const session = await getServerSession(authOptions)
    return await prisma.task.count(
        {
            where: {
                completed: state === "done",
                user_id: session?.user.id
            }
        })
}


