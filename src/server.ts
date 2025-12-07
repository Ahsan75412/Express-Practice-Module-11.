
import express, { NextFunction, Request, Response } from 'express';
// import pg module to connect with postgresql database
import {Pool} from 'pg';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';





const app = express()
const port = config.port;

//parser middleware
app.use(express.json());
// form data parse korar jonno middleware
app.use(express.urlencoded());




// Data base Start haere............................................................................



// initializing database tables
initDB();





app.get('/',logger, (req: Request, res: Response) => {
  res.send('Hello Next level developer mr.ahsan habib khan!')
  
})


// created user data using post api.......................................................

app.use("/users", userRoutes);






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
