import type { Express } from 'express';
import https from 'https';

export type Options = {
  ca: string;
  cert: string;
  key: string;
  port: number;
};

export default (app: Express, opts: Options) => {
  const { port, ...rest } = opts;

  const httpsServer = https.createServer(rest, app).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port} (over HTTPS)`);

    process.on('SIGINT', () => {
      httpsServer.close(err => {
        process.exit(err ? 1 : 0);
      });
    });
  });

  if (process.send) {
    process.send('ready');
  }
};
