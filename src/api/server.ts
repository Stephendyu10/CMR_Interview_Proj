import express from "express";
import taskRoutes from "./routes/tasks";
import clientRoutes from "./routes/clients";
import engagementRoutes from "./routes/engagements";
import requestRoutes from "./routes/requests";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/clients", engagementRoutes);
app.use("/clients", requestRoutes);
app.use(taskRoutes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
