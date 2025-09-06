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


    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;

try {
    // const response = await pgClient.query( `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password}) `); THIS iS BAD 

    pgClient.query("BEGIN"); //transaction started

    const responsed = await pgClient.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id", [username, email, password] ) 
    // RETURNING * => returnning everything || RETURNING id => 
    console.log(responsed); 
    const userId = responsed.rows[0].id;  

    const addressInsertquery = await pgClient.query("INSERT INTO addresses (city, country, street, pincode, user_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *", [city, country, street, pincode, userId] ) 


    pgClient.query("COMMIT"); //transaction END

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
