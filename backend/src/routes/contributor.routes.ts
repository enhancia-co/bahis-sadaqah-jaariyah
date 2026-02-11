import { Router } from "express";
import { ContributorController } from "../controllers/contributor.controller";
import { ContributorService } from "../services/contributor.service";
import { validateToken } from "../middlewares/auth.middleware";

const router = Router();

const contributorService = new ContributorService();
const contributorController = new ContributorController(contributorService);

router.post("/", validateToken, contributorController.createContributor.bind(contributorController));
router.get("/", validateToken, contributorController.getAllContributors.bind(contributorController));
router.get("/:id", validateToken, contributorController.getContributorById.bind(contributorController));
router.put("/:id", validateToken, contributorController.updateContributor.bind(contributorController));
router.put("/:id/status", validateToken, contributorController.changeContributorStatus.bind(contributorController));
router.delete("/:id", validateToken, contributorController.deleteContributor.bind(contributorController));

export default router;