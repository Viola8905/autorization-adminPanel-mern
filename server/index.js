const express = require("express");
const mongoose = require("mongoose");
const Router = require("./Router");
const PORT = process.env.PORT || 5000;
const run = require("./debug/debug");
const corsMiddleware = require("./middleware/cors.middleware");
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/api", Router);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://artem:artem@cve-cluster.oovnp.mongodb.net/cve-cluster?retryWrites=true&w=majority`
    );
    // `mongodb+srv://adminPanel:adminPanel29@cluster0.hfhxt.mongodb.net/adminPanel?retryWrites=true&w=majority`
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
