import { Router } from 'express';
import { FruitsController } from '../controllers/fruits.controller.js';
import { FruitsFileRepo } from '../repository/fruits.file.repo.js';

// eslint-disable-next-line new-cap
export const fruitsRouter = Router();
export const repo = new FruitsFileRepo();
export const controller = new FruitsController(repo);

fruitsRouter.get('/', controller.getAll.bind(controller));
fruitsRouter.get('/:id', controller.get.bind(controller));
fruitsRouter.post('/', controller.post.bind(controller));
fruitsRouter.patch('/:id', controller.update.bind(controller));
fruitsRouter.delete('/:id', controller.delete.bind(controller));
