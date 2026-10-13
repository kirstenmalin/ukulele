import express from 'express';
import router from './router.js';

const app = express();

app.use(router);

const port = 5000;
app.listen(port);
console.log(`Ukulele app listening on port ${port}`);
