import app from "./app.js";
import config from "./config/env.js";

const port = config.port;

app.listen(port, () => {
  console.log(`Server is Running at Port: ${port}`);
});
