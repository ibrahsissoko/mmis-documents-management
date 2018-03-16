'use strict';

import * as express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/',(req,res,next) => {
  res.send({ok: true, message: 'Welcome to Document uploader server!'});
});

export default router;