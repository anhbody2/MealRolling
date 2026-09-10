import express from 'express'
import path from 'path'
import cors from 'cors'
import sequelize from './config/db.js'

import { apiRouter } from './routes/index.js'
// import taskRoute from './routes/task.route.js'

const app = express()

app.use(cors());
app.use(express.static('publish'));
app.use(express.json());

apiRouter(app);

app.listen(4000, () => {
  console.log('Chạy thành công');
})
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
