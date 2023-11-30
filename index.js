require("dotenv").config();

const app = require("./src/app");

const port = process.env.APP_PORT;
app.get("/", (req, res) => {
  res.send("Welcome to Express");
});
app
  .listen(port, () => {
    console.log(`Server is listening on ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
