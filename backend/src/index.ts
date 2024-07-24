import "tsconfig-paths/register";
import app from "./app";
import Logging from "./utils/Logging";
import { env } from "./config/env";
import { connectDB } from "./config/db";

connectDB();

app.listen(env.PORT, () => {
  Logging.log(`Server is running at localhost:5000`);
});
