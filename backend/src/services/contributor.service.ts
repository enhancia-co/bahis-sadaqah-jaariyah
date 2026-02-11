import prisma from "../configs/db";
import {Contributor} from "../dtos/request.dto"

export class ContributorService {

    async createContributor(contributor: Contributor) {
        try {
            const newContributor = await prisma.contributor.create({
                data: contributor,
            });
            return newContributor;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async getAllContributors() {
        try {
            const contributors = await prisma.contributor.findMany();
            return contributors;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async getContributorById(id: string) {
        try {
            const contributor = await prisma.contributor.findUnique({
                where: {
                    id,
                },
            });
            return contributor;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async updateContributor(id: string, contributor: Contributor) {
        try {
            const updatedContributor = await prisma.contributor.update({
                where: {
                    id,
                },
                data: contributor,
            });
            return updatedContributor;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async changeContributorStatus(id: string, isActive: boolean) {
        try {
            const contributor = await prisma.contributor.update({
                where: {
                    id,
                },
                data: {
                    isActive,
                },
            });
            return contributor;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }

    async deleteContributor(id: string) {
        try {
            const contributor = await prisma.contributor.delete({
                where: {
                    id,
                },
            });
            return contributor;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while login user :", message);
            throw error;
        }
    }
}