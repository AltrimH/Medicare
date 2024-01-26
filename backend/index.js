import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import qualificationRoute from "./routes/qualification.js";
import experienceRoute from "./routes/experience.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

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

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/qualifications", qualificationRoute);
app.use("/api/v1/experiences", experienceRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on: ${PORT}`);
});
