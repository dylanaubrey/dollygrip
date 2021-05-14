import type { Express } from 'express';
import http from 'http';

export type Options = {
  port: number;
};

export default (app: Express, opts: Options) => {
  const { port } = opts;
  const server = http.createServer(app);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port} (over HTTP)`);
  });
};
