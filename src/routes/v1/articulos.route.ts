import { Router } from "express"
import { getArticulos, getArticulo, postArticulo, deleteArticulo,putArticulo } from "../../controllers/articulo.controller";
import { validateBody, validateParams, validateQuery } from "../../middlewares/zod.validate";
import { articleQuerySchema, articuloParamSchema, createArticuloSchema, updateArticuloSchema } from "../../validations/articulo.schema";
import { checkJWT, checkRole } from "../../middlewares/session";

const articuloRouter = Router()

articuloRouter.get("/",checkJWT,validateQuery(articleQuerySchema) ,getArticulos);
articuloRouter.get("/:id",checkJWT,validateParams(articuloParamSchema),getArticulo);
articuloRouter.post("/",checkJWT,checkRole([2]),validateBody(createArticuloSchema) ,postArticulo);
articuloRouter.put("/:id",checkJWT,checkRole([2]) ,validateParams(articuloParamSchema),validateBody(updateArticuloSchema),putArticulo);
articuloRouter.delete("/:id",checkJWT,validateParams(articuloParamSchema),checkRole([2]),deleteArticulo);

export default articuloRouter;