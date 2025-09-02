import express from "express";

import { Client } from "pg";


const app = express();
app.use(express.json());

const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:wrWG5KI1ziYB@ep-lucky-snow-a50il0b5.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

pgClient.connect();

app.post("/signup", async (req, res) => {

    const  username = req.body.username;
    const  password = req.body.password;
    const email  = req.body.email;
try {
    const response = await pgClient.query( `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password}) `);

    // "username": "aaskjdhf873jshd",
    // "email": "asdasd@gmail.com".
    // "password": "'); DELETE * FROM users; "   is the user send this from the client the it will delete all the users table 

    // console.log(response); =====> INSERT INTO users (username, email, password) VALUES ("aaskjdhf873jshd", 'asdasd@gmail.com', ''); DELETE * FROM users;') ====> this will delete the users table 

//############## 
    const responsed = await pgClient.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    ) 
//############## This will save the database from hacker or SQL Injection  bcoz query will not reach like this `INSERT INTO users (username, email, password) VALUES ("aaskjdhf873jshd", 'asdasd@gmail.com', ''); DELETE * FROM users;')` 
//first this will reach `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *` than usename , email and password will run and "'); DELETE * FROM users;'" this will be stored as it is in password col

    res.json({
      message: "You have signed up"
    });
}
catch(e){
    res.json({
        Message: "Error while signing up"
    })
}
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
