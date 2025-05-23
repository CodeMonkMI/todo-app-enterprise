import http from "http";
import { createApp } from "./app";
const PORT = process.env.PORT || 5000;
let server: http.Server;
async function main() {
  try {
    const app = createApp();

    server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("failed to start app");
    process.exit(1);
  }
}

main();
