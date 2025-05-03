import "dotenv/config";
import { mongoConnect } from "./database";
import app from "./app";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
