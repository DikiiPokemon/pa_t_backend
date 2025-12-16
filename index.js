// my-app/index.js
require("dotenv").config()
const express = require('express');
 
const PORT = process.env.PORT || 3010;
const app = express();
const cors = require("cors")
const router = require("./routes/index")

const errorHandler = require("./middleware/ErrorHandler")

const corsOptions = {
  origin: process.env.FRONT_ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api", router)



app.use(errorHandler)


const start = async () => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
}

start()

