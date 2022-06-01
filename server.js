const express = require("express");
const app = express();
const port = 4000;

const booksRouter = require("./routes/booksRouter");
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the library system");
});

app.use("/books", booksRouter.router);
app.use("/auth", authRouter.router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
