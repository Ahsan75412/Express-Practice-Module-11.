
//.env file theke environment variable gula access korar jonno dotenv package import kora holo
import dotenv from 'dotenv';
//.env file er path set korar jonno path module import kora holo
import path from 'path';



// .env file theke environment variable gula load korar jonno dotenv.config() use kora holo 
dotenv.config({path: path.join(process.cwd() , '.env')});


const config = {
    connection_str: process.env.CONNECTION_STR,
    port: process.env.PORT 
}


export default config;

