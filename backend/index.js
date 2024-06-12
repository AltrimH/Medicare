import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

// Admin-Routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";

// Client-Routes
import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import patientRoute from "./routes/patient.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import qualificationRoute from "./routes/qualification.js";
import experienceRoute from "./routes/experience.js";

// Config
dotenv.config();
const corsOptions = {
  origin: true,
};
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Auth-Routes
app.use("/api/v1/auth", authRoute);

// Admin-Routes
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/general", generalRoutes);
app.use("/api/v1/management", managementRoutes);

// Client-Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/patients", patientRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
// app.use("/api/v1/qualifications", qualificationRoute);
// app.use("/api/v1/experiences", experienceRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});
// Port
const PORT = process.env.PORT || 5000;

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB failed to connect");
  }
};

// server listen
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on: ${PORT}`);
});
