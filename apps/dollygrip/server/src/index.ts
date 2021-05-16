import express from 'express';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import makeApp from './makeApp';
import makeGraphQLServer from './middleware/makeGraphQLServer';
import serveClientApp from './middleware/serveClientApp';
import serveOverHTTP from './middleware/serveOverHTTP';
import serveOverHTTPS from './middleware/serveOverHTTPS';
import serveStatus from './middleware/serveStatus';

require('dotenv').config({ path: resolve(__dirname, '../../.env') });

const { API_KEY, CLIENT_PATH, HTTPS, NODE_ENV, NODE_SSL_CA, NODE_SSL_CERT, NODE_SSL_KEY, PORT } = process.env;
const clientPath = resolve(process.cwd(), CLIENT_PATH);
const https = Boolean(HTTPS);
const isProd = NODE_ENV === 'production';
const port = Number(PORT);

(async () => {
  const app = makeApp();
  const graphQLServer = await makeGraphQLServer({ apiKey: API_KEY });
  app.use(serveStatus());
  app.use('/graphql', graphQLServer.request());

  app.use(
    '/static',
    express.static(join(clientPath, 'public'), {
      fallthrough: false,
      immutable: isProd,
      maxAge: isProd ? 31536000 : 0,
      setHeaders(res) {
        res.set('X-Frame-Options', 'sameorigin');
      },
    })
  );

  app.use(serveClientApp({ clientPath }));

  if (https && NODE_SSL_CA && NODE_SSL_CERT && NODE_SSL_KEY) {
    serveOverHTTPS(app, {
      ca: readFileSync(NODE_SSL_CA, 'utf8'),
      cert: readFileSync(NODE_SSL_CERT, 'utf8'),
      key: readFileSync(NODE_SSL_KEY, 'utf8'),
      port,
    });
  } else {
    serveOverHTTP(app, { port });
  }
})();
