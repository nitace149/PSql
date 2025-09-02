import express from 'express'
const app = express();


import { Client } from 'pg';

const pgClient = new Client ({
user: "neondb_owner", password: "wrWG5KI1ziYB",
port: 5432,
host: "ep-lucky-snow-a50il0b5.us-east-2-aws. neon.tech",
database: "neondb"
})
// const pgClient = new Client ({"Object | String"}) 
// HERE WE CAN PASS OBJECT AS WELL AS CONNECTION STRING OF CLOUD AND http://localhost: URL


async function main(){
await pgClient.connect();  // ===========> this will call the connect function to connect the database with above crediential
const response = await pgClient.query("SELECT * FROM users");
console.log(response);

}