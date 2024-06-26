const connectToMongo = require("./db");
const express = require("express");
const app = express();
connectToMongo();

const port = 5000; // just change bcz our react app will run at 3000
app.use(express.json()); // for use of req.body have to use ehtis middle wear

// Avilable Routes
app.get("/", (req, res) => {
  res.send("Hello Yogesh!");
});

app.use("/api/auth/", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
