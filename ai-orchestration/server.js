import app from "./src/app.js";
import "dotenv/config";

app.listen(3000, (req, res) => {
  console.log("ai-orchestration server started is running on port - 3000");
});
