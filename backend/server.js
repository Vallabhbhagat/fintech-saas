const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const connectDB = require("./config/db.js");
const incomeRoute = require("./routes/incomeRoute.js");
const expenceRoute = require("./routes/expenceRoute.js");
const financeRoutes = require("./routes/finance.js");
const authRoutes = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboard.js");



dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());

app.use(cors());

app.use("/api/income", incomeRoute);
app.use("/api/expence", expenceRoute);
app.use("/api/finance", financeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
    console.log(`server is running as http://localhost:${port}`)
})