import prisma from "@/db/client";
import bcrypt from 'bcrypt'; // Use bcrypt for hashing passwords
import { User } from "@prisma/client";
import { sendRegistrationMail } from "./MailService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createRegistrationToken } from "./TokenService";

export const createUser = async (email: string, password: string, name = ""): Promise<User | null> => {
    "use server";
    const saltRounds = 10; // Define the number of salt rounds for hashing
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt); // Hash the password with bcrypt
    const registrationToken = createRegistrationToken();
    let newUser: User | null = null;
    try {
      newUser = await prisma.user.create({
        data: {
            name,
            email,
            salt,
            registrationToken,
            passwordHash, // Store the hashed password
        },
      });
      await sendRegistrationMail(email, name, registrationToken);
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Email already exists');
        }
        
        throw new Error(`Error creating user: ${error}`);
    }

    return newUser;
};

export const authenticateUser = async (email: string, password: string) => {
    "use server";
    console.log("authenticateUser");
    
    console.log("email", email);
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }
    return user;
}

export const confirmRegistration = async (email: string, token: string): Promise<User> => {
    "use server";
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.registrationToken !== token) {
        throw new Error('Invalid token');
    }
    await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() },
    });

    return user;
};

