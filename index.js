require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRoute"),
  authRouter = require("./routes/authRoute");
app.use(indexRouter);
app.use(authRouter);

const PORT = process.env.PORT || 8000;
const link = `mongodb+srv://techsyndicate2:${process.env.MONGO_PASS}@cluster0.dc5krnu.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
