require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;

const authMiddleware = require("./middlewares/authorizedToUseRoutes");

const booksRouter = require("./routes/booksRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/usersRouter");
const myInfoRouter = require("./routes/myinfoRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the library system");
});

app.use("/books", booksRouter.router);
app.use("/auth", authRouter.router);
app.use("/users", authMiddleware.authorizedToUseRoutes, userRouter.router);
app.use("/me", authMiddleware.authorizedToUseRoutes, myInfoRouter.router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
