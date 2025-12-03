
import express, { Request, Response } from 'express';
// import pg module to connect with postgresql database
import {Pool} from 'pg';
//.env file theke environment variable gula access korar jonno dotenv package import kora holo
import dotenv from 'dotenv';
//.env file er path set korar jonno path module import kora holo
import Path from 'path';






// .env file theke environment variable gula load korar jonno dotenv.config() use kora holo
dotenv.config({path: Path.join(process.cwd() , '.env')});

const app = express()
const port = 5000

//parser middleware
app.use(express.json());
// form data parse korar jonno middleware
app.use(express.urlencoded());




// Data base Start haere............................................................................


// to connect with database
const pool = new Pool({
  connectionString: '${process.env.CONNECTION_STR}',
});


const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT ,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
    `);


// todos table create & reference or relations with users table
    await pool.query(`
     CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
      `);
    };


initDB();



app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next level developer mr.ahsan habib!')
  
})

app.post("/", (req: Request, res: Response) => {

  console.log(req.body);

  res.status(201).json({
    sucess: true,
     message: "post Data created successfully" 
    });
  // res.send("Post request received"); ei 2 vabei kora jay
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
