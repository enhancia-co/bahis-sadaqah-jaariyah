import { Request, Response } from "express";
import { ContributorService } from "../services/contributor.service";
import { Contributor } from "../dtos/request.dto";

export class ContributorController {
    constructor(private readonly _contributorService: ContributorService) { };

    async createContributor(req: Request, res: Response) {
        try {
            const { name, mobile, boxNumber, address,place } = req.body as Contributor;

            if (!name || !mobile || !boxNumber) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const contributor = await this._contributorService.createContributor({ name, mobile, boxNumber, address, place });
            return res.status(201).json({ success: true, data: contributor });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while creating contributor :", message);
            return res.status(500).json({ success: false, message });
        }
    }

    async getAllContributors(req: Request, res: Response) {
        try {
            const contributors = await this._contributorService.getAllContributors();
            return res.status(200).json({ success: true, data: contributors });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while getting contributors :", message);
            return res.status(500).json({ success: false, message });
        }
    }

    async getContributorById(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const contributor = await this._contributorService.getContributorById(id);
            return res.status(200).json({ success: true, data: contributor });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while getting contributor by id :", message);
            return res.status(500).json({ success: false, message });
        }
    }

    async updateContributor(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const contributor = await this._contributorService.updateContributor(id, req.body);
            return res.status(200).json({ success: true, data: contributor });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while updating contributor :", message);
            return res.status(500).json({ success: false, message });
        }
    }

    async changeContributorStatus(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const isActive = req.body.isActive;

            if (typeof isActive !== "boolean" || !id) {
                return res.status(400).json({ success: false, message: "Invalid request" });
            }

            const contributor = await this._contributorService.changeContributorStatus(id, isActive);
            return res.status(200).json({ success: true, data: contributor });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while changing contributor status :", message);
            return res.status(500).json({ success: false, message });
        }
    }

    async deleteContributor(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const contributor = await this._contributorService.deleteContributor(id);
            return res.status(200).json({ success: true, data: contributor });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Error while deleting contributor :", message);
            return res.status(500).json({ success: false, message });
        }
    }
}