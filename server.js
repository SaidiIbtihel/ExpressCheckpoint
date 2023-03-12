const express = require("express");
const path = require("path");
const app = express();

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

const authorized = (req, res, next) => {
  const isAuth = true;
  if (isAuth) {
    req.users = users;
    next();
  } else {
    res.status(401).send("Not authorized");
  }
};

// Middlewares
app.use(authorized);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/users", (req, res) => {
  console.log(req.hostname);
  console.log(req.users);
  res.send(req.users);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
