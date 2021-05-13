import type { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.useragent?.isIE || req.useragent?.isIECompatibilityMode) {
    res.set({
      'Cache-Control': 'no-cache',
      Expires: '-1',
      Pragma: 'no-cache',
    });
  }

  next();
};
