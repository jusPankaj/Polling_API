import express from 'express'
import dotenv from 'dotenv'

const app = express();

// dotenv.config();

const port = process.env.PORT || 3000
app.use(express.json());

app.listen(port, ()=>{
    console.log(`server is up and running on port ${port}`);
});