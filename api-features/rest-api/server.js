import app from "./src/app.js";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
  console.log(`Server Live on Developement at: http://127.0.0.1:${port}`);
});
