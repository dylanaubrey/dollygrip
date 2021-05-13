import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import useragent from 'express-useragent';
import helmet from 'helmet';
import preventIEBrowserCaching from './middleware/preventIEBrowserCaching';

export default () => {
  const app = express();
  app.set('trust proxy', 1);
  app.set('views', 'views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs').__express);
  app.use(compression());
  app.use(helmet());
  app.use(useragent.express());
  app.use(preventIEBrowserCaching);
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.get('./robots.txt', (_req, res) => {
    res.type('text/plain').send('User-Agent: *\nDisallow: /');
  });

  return app;
};
