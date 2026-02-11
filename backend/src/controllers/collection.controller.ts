import { Request, Response } from "express";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { HttpError } from "../utils/HttpError";
import { CollectionService } from "../services/collection.service";

export class CollectionController {

    constructor(private _collectionService: CollectionService) { }

    async createCollection(req: Request, res: Response) {
        try {
            const { contributorId, amount, collectedOn, collectedBy, remarks } = req.body;
            const collection = await this._collectionService.createCollection(
                contributorId,
                amount,
                new Date(collectedOn),
                collectedBy,
                remarks
            );
            res.status(HTTP_STATUS.OK).json({ success: true, message: HTTP_MESSAGE.OK, data: collection });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async getAllCollections(req: Request, res: Response) {
        try {
            const collections = await this._collectionService.getAllCollections();
            res.status(HTTP_STATUS.OK).json({ success: true, message: HTTP_MESSAGE.OK, data: collections });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async getCollectionById(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const collection = await this._collectionService.getCollectionById(id);
            res.status(HTTP_STATUS.OK).json({ success: true, message: HTTP_MESSAGE.OK, data: collection });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async updateCollection(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const collection = await this._collectionService.updateCollection(id, req.body);
            res.status(HTTP_STATUS.OK).json({ success: true, message: HTTP_MESSAGE.OK, data: collection });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }

    async deleteCollection(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const collection = await this._collectionService.deleteCollection(id);
            res.status(HTTP_STATUS.OK).json({ success: true, message: HTTP_MESSAGE.OK, data: collection });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                console.info(`HTTP Error: ${error.status} - ${error.message}`);
                res.status(error.status).json({ success: false, message: error.message });
            } else {
                console.error('Unexpected error:', error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: HTTP_MESSAGE.INTERNAL_SERVER_ERROR })
            }
        }
    }
}