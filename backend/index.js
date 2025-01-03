const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");

require("dotenv").config();
require("./Configuration/db");
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send("server is running on port 3000");
});

app.use(bodyParser.json());
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
