import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import multer from "multer";
import { registerUser, registerAdmin } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", false);

// FILE STORAGE
const adminStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const adminUpload = multer({ storage: adminStorage });
const userUpload = multer({ storage: userStorage });

// ROUTES WITH FILES
app.post("/user/register", userUpload.fields([{ name: "picture" }]), registerUser);
app.post("/admin/register", adminUpload.fields([{ name: "picture" }]), registerAdmin);

// ROUTES
app.use("/auth", authRoutes);

// MONGODB CONNECTION
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));