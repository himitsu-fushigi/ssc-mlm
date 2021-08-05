const http = require("http");

// @dev configuration for environmental variables
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = require('./app')

http.createServer(app).listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server Started => ${PORT}`);
});