import express from 'express';
import employeeRouter from './routes/employee';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use('/meta/health', require('express-healthcheck')());

const dbhost = process.env.MONGODB_HOST || 'localhost';
const dbport = process.env.MONGODB_PORT || 27017;

let dbconUrl;
if (process.env.MONGODB_USER && process.env.MONGODB_PWD) {
  const dbuser = process.env.MONGODB_USER || '';
  const dbpwd = process.env.MONGODB_PWD || '';
  dbconUrl = `mongodb://${dbuser}:${dbpwd}@${dbhost}:${dbport}/employee`;
} else
  dbconUrl = process.env.MONGODB_PORT ? `mongodb://${dbhost}:${dbport}/employee` : `mongodb://${dbhost}/employee`;

mongoose.connect(dbconUrl, { useNewUrlParser: true });

app.use('/employee', employeeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});