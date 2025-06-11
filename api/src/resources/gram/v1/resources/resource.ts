import { Request, Response } from "express";
import { DataAccessLayer } from "@gram/core/dist/data/dal.js";

export function getResources(dal: DataAccessLayer) {
  return async (req: Request, res: Response) => {
    const modelId = req.params.id;
    const model = await dal.modelService.getById(modelId);
    if (model && model.systemId) {
      const resources = await dal.resourceHandler.getResources(model.systemId);
      res.json(resources);
      return;
    }
    if (model) {
      res.status(400).json({
        error: "Cannot fetch resources: Model exists but lacks system-id",
        modelId,
      });
      return;
    }
    res.status(404).json({
      error: "Model not found",
      modelId,
    });
  };
}
