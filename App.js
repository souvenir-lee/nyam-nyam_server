const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(morgan("nyamnyam"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true, // maxAge -> 갱신
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000 * 30, // 30분간 세션 유지
      // sameSite: 'lax',
    },
  })
);
app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(4000, () => {
  console.log("server on 4000");
});

module.exports = app;
