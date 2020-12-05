require('dotenv').config();
const path = require("path");
const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes 
app.use("/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(PORT, (err) => {
  console.log(`Shh. I'm listening on ${PORT}.`);
});