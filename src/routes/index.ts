import express, { Router } from 'express';
import images from './api/images';

const routes: Router = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send('connected!');
});

routes.use('/images', images);

export default routes;
