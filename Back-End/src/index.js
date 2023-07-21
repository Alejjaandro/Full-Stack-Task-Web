import app from "./app.js";
import { connectDB } from "./db.js";

// Stablishing the port in wich the app will run.
const PORT = 4000

// Connecting to database
connectDB();

// Initializing the server
app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}/`);