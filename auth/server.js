import app from "./src/app.js";
import { connectToDb } from "./src/config/db.js";

connectToDb();


app.listen(3000, () => {
  console.log("Auth server is running on port 3000");
});
