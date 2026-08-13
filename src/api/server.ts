import express from "express";
import taskRoutes from "./routes/tasks";
import clientRoutes from "./routes/clients";
import engagementRoutes from "./routes/engagements";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/clients", engagementRoutes);
app.use(errorHandler);
app.use(taskRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
