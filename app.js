const express = require("express");
const app = express();

// @dev allow cross origin requests
const cors = require("cors");
app.use(cors());

// @dev log client request and response
const morgan = require("morgan");
app.use(morgan("dev"));

// @dev parse request and response data e.g. urlencoded and json data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @dev mongo db config
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(err);
    else console.log("Database Connected => SSC-Distributor...");
  }
);

const DistributorChainRouter = require("./routes/Distributor.Chain");
app.use("/api/v1/distributor/chain", DistributorChainRouter);

// @dev handling 404 api request from client
app.use((req, res) => {
  res.status(404).json({ message: "404 API not found!" });
});

module.exports = app;
