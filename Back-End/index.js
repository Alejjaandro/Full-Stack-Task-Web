// Imports
const express = require("express");

// Port in wich the app will run
const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});