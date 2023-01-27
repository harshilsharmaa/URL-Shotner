const app = require('./app');
var fs = require("fs");
var https = require("https");

const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 4000;


https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(PORT, function () {
    console.log(
      "listening on port 4000! Go to https://localhost:4000/"
    );
  });