import express from "express";
import cors from "cors";
import authRouter from "./routes/v1/auth.route";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
