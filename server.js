import dns from "dns";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);



async function startServer() {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      console.log(
        ` ScanPass API running on http://localhost:${env.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();