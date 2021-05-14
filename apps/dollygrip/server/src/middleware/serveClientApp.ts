import { Router } from 'express';
import type { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export default ({ clientPath }: { clientPath: string }) => {
  const router = Router();

  router.get('*', (_req: Request, res: Response) => {
    const indexHTML = readFileSync(join(clientPath, 'public', 'index.html'), 'utf8');
    return res.send(indexHTML);
  });

  return router;
};
