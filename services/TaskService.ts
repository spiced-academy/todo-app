import { revalidatePath } from "next/cache";
import prisma from "@/db/client";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from '@/nextauth/authOptions';
import { sendMessage } from "./SseService";

export const _revalidatePaths = () => {
    revalidatePath("/[[..taskState]]", "layout")
}

export const getNewTasksByUserId = async (userId: string): Promise<Task[]> => {
    return prisma.task.findMany({
        where: {
            user_id: userId,
            new: true
        }
    })
}

export const assignTaskToUser = async (taskId: string, userId: string): Promise<Task> => {
    "use server";
    const result = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            user_id: userId,
            new: true
        }
    })
    sendMessage(userId, "new task")
    _revalidatePaths()
    return result
}

export const createTask = async (title: string): Promise<Task> => {
    "use server";
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("You must be logged in to create a task!")
    }
    console.log("createTask - session", session);
    const result = await prisma.task.create({
        data: {
            title,
            user_id: session.user.id
        }
    })
    _revalidatePaths()
    return result
}

export const getTasks = async () => {
    "use server";
    const session = await getServerSession(authOptions)
    return prisma.task.findMany({
        where: {
            user_id: session?.user.id
        },
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
    const session = await getServerSession(authOptions)
    return await prisma.task.count(
    {
        where: {
            completed: state === "done",
            user_id: session?.user.id
        }
    })
}


