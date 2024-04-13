const express = require('express')
const dotenv = require("dotenv");
const rootRouter = require("./routes/index");
const connectDb = require("./config/db");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;
dotenv.config();
connectDb();

app.use(express.json());

app.use(
  cors({
    origin: "https://localhost:3000", // which domain we allow our API to access
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
