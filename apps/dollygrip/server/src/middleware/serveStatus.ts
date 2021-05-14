import { Router } from 'express';
import type { Request, Response } from 'express';

export default () => {
  const router = Router();

  router.get('/status', (_req: Request, res: Response) => {
    res.status(200).json({
      date: new Date(),
      status: 'UP',
    });
  });

  return router;
};
