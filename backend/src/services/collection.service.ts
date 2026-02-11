import prisma from "../configs/db";
import { Collection } from "../dtos/request.dto";

export class CollectionService {
    constructor() { };
    async createCollection(contributorId: string, amount: number, collectedOn: Date, collectedBy?: string, remarks?: string) {
        try {
            const collection = await prisma.collection.create({
                data: {
                    contributorId,
                    amount,
                    collectedOn,
                    collectedBy,
                    remarks,
                },
            });
            return collection;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while creating collection :", message);
            throw error;
        }
    }

    async getAllCollections() {
        try {
            const collections = await prisma.collection.findMany();
            return collections;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while getting collections :", message);
            throw error;
        }
    }

    async getCollectionById(id: string) {
        try {
            const collection = await prisma.collection.findUnique({
                where: {
                    id,
                },
            });
            return collection;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while getting collection by id :", message);
            throw error;
        }
    }

    async updateCollection(id: string, collection: Collection) {
        try {
            const updatedCollection = await prisma.collection.update({
                where: {
                    id,
                },
                data: collection,
            });
            return updatedCollection;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while updating collection :", message);
            throw error;
        }
    }

    async deleteCollection(id: string) {
        try {
            const collection = await prisma.collection.delete({
                where: {
                    id,
                },
            });
            return collection;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while deleting collection :", message);
            throw error;
        }
    }
}

