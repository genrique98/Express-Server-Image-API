import express from 'express';
import routes from './routes';
const app = express();
const port = 3000;

app.use('/api', routes);

// start express server on port
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
