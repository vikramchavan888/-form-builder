const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");

require("dotenv").config();
require("./Configuration/db");
const PORT = process.env.PORT;

const corsOptions = {
  origin: "https://form-builder-app-delta.vercel.app",
};

app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.send("server is running on port 3000");
});

app.use(bodyParser.json());
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
