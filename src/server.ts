import express from "express";

import { categoryRoute } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoryRoute);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => console.log("Running on port 3333"));
