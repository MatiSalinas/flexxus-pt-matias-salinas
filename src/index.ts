import express from "express";
import cors from "cors";
import authRouter from "./routes/v1/auth.route";
import articuloRouter from "./routes/v1/articulos.route";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/articulos", articuloRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
