import { Router } from "express";
import { CollectionController } from "../controllers/collection.controller";
import { CollectionService } from "../services/collection.service";
import { validateToken } from "../middlewares/auth.middleware";

const router = Router();
const collectionService = new CollectionService();
const collectionController = new CollectionController(collectionService);

router.post("/", validateToken, collectionController.createCollection.bind(collectionController));
router.get("/", validateToken, collectionController.getAllCollections.bind(collectionController));
router.get("/:id", validateToken, collectionController.getCollectionById.bind(collectionController));
router.put("/:id", validateToken, collectionController.updateCollection.bind(collectionController));
router.delete("/:id", validateToken, collectionController.deleteCollection.bind(collectionController));

export default router;