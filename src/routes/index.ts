import express from 'express';
import teachers from './api/teachers';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('connected!');
});

routes.use('/teachers', teachers);
routes.use('/images', images);

export default routes;