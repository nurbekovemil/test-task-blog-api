const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authController = require("./controllers/auth.controller");
const postController = require("./controllers/post.controller");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/api-docs.json");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);
app.use("/api/auth", authController);
app.use("/api/post", postController);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has been started on port`, PORT)
    );
  } catch (e) {
    console.log("Server start error", e);
  }
};

start();
