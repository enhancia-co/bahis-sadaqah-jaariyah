import { Response } from "express";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { HttpError } from "../utils/HttpError";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { clearCookie } from "../utils/cookie";
import prisma from "../configs/db";


export class AuthService {

    async login(username: string, password: string): Promise<{ accessToken: string, user: { id: string, name: string, username: string } }> {
        try {
            const admin = await prisma.admin.findUnique({ where: { username } });

            if (!admin) throw new HttpError(HTTP_MESSAGE.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

            const isPasswordMatch = await bcrypt.compare(password, admin.password!);

            if (!isPasswordMatch) throw new HttpError(HTTP_MESSAGE.INCORRECT_PASSWORD, HTTP_STATUS.UNAUTHORIZED);

            const accessToken = generateToken({ id: admin.id }, process.env.JWT_ACCESS_SECRET as string, 3600);

            return { accessToken, user: { id: admin.id, name: admin.name, username: admin.username } };

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async signup(name: string, username: string, password: string): Promise<{ accessToken: string, user: { id: string, name: string, username: string } }> {
        try {
            const existingUser = await prisma.admin.findUnique({ where: { username } });

            if (existingUser) throw new HttpError(HTTP_MESSAGE.ALREADY_EXISTS, HTTP_STATUS.CONFLICT);

            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = {
                name,
                username,
                password: hashedPassword
            }

            const user = await prisma.admin.create({ data: userData });

            const accessToken = generateToken({ id: user.id }, process.env.JWT_ACCESS_SECRET as string, 3600);

            return { accessToken, user: { id: user.id, name: user.name, username: user.username } };

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while signup user :", message);
            throw error;
        }
    }

    async logout(res: Response): Promise<void> {
        try {
            clearCookie(res, "accessToken");
            return;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while logouting user :", message);
            throw error;
        }
    }

}