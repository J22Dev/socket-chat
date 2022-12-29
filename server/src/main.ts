import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { PORT } from "./modules/common/config";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./modules/middleware/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { authMiddleware } from "./modules/middleware/auth.middleware";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.get("/protected", authMiddleware, (req, res, next) => {
  res.status(200).json({ message: "Auth Works" });
});
app.use(errorMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const main = async () => {
  server.listen(PORT, () => {
    console.log("Running On", PORT);
  });
};

main();
