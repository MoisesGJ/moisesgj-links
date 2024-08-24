import express from 'express';
const router = express.Router();

import linkMiddlewares from '#middlewares/link.middlewares';
import linkController from '#controllers/link.controllers';

router.post('/', linkMiddlewares.validateBody, linkController.createLink);

export default router;
