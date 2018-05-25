'use strict';
import * as path from 'path';
let envPath = path.join(__dirname, '../../mmis-config');
require('dotenv').config(({ path: envPath }));

import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as fse from 'fs-extra';
import * as cors from 'cors';

import * as Knex from 'knex';
import { MySqlConnectionConfig } from 'knex';

import { Jwt } from './models/jwt';
const jwt = new Jwt();

import index from './routes/index';
import upload from './routes/uploads';

const app: express.Express = express();
const uploadDir = process.env.MMIS_DATA;

fse.ensureDirSync(uploadDir);
//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

let db: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

app.use((req, res, next) => {
  req.db = Knex({
    client: 'mysql',
    connection: db,
    pool: { min: 0, max: 7 }
  });
  next();
});

let checkAuth = (req, res, next) => {
  let token: string = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      return res.send({
        ok: false,
        error: 'No token provided.',
        code: 403
      });
    });
}

app.use('/uploads', upload);
app.use('/', index);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


if (process.env.NODE_ENV === 'development') {
  app.use((err: Error, req, res, next) => {
    console.log(err);
    res.status(err['status'] || 500);
    res.send({
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

app.use((err: Error, req, res, next) => {
  console.log(err);
  res.status(err['status'] || 500);
  res.send({ ok: false, error: err });
});

export default app;
