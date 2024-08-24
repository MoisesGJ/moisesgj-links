import express from 'express';
const router = express.Router();

import linkMiddleware from '#middlewares/link.middlewares';
import linkControllers from '#controllers/link.controllers';

router.get('/', function (_, res, __) {
  res.render('index', { title: 'MoisesGJ | Links' });
});

router.get(
  '/:shortLink',
  linkMiddleware.validateShortLink,
  linkControllers.getLink
);

export default router;
