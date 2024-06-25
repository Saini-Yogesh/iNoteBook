const connectToMongo = require("./db");
const express = require("express");
const app = express();
connectToMongo();

const port = 3000;

// Avilable Routes
app.get("/", (req, res) => {
  res.send("Hello Yogesh!");
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
