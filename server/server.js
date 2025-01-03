

// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const authRouter = require("./routes/auth/auth-routes");
// const adminProductsRouter = require("./routes/admin/products-routes");
// const adminOrderRouter = require("./routes/admin/order-routes");

// const shopProductsRouter = require("./routes/shop/products-routes");
// const shopCartRouter = require("./routes/shop/cart-routes");
// const shopAddressRouter = require("./routes/shop/address-routes");
// const shopOrderRouter = require("./routes/shop/order-routes");
// const shopSearchRouter = require("./routes/shop/search-routes");
// const shopReviewRouter = require("./routes/shop/review-routes");
// require("dotenv").config();

// const commonFeatureRouter = require("./routes/common/feature-routes");

// // Database connection
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

// const app = express();
// const PORT = process.env.PORT || 5000;

// // CORS configuration without origin (allows all origins)
// const corsOptions = {
//   origin: "http://localhost:5173", // Set your frontend origin here
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Cache-Control",
//     "Expires",
//     "Pragma",
//   ],
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

// app.use(cors(corsOptions));

// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrderRouter);
// app.use("/api/shop/products", shopProductsRouter);
// app.use("/api/shop/cart", shopCartRouter);
// app.use("/api/shop/address", shopAddressRouter);
// app.use("/api/shop/order", shopOrderRouter);
// app.use("/api/shop/search", shopSearchRouter);
// app.use("/api/shop/review", shopReviewRouter);
// app.use("/api/common/feature", commonFeatureRouter);

// // Start the server
// app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));







const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
require("dotenv").config();

const commonFeatureRouter = require("./routes/common/feature-routes");

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: "https://ecom-project-ranjith-mca.vercel.app", // Set your frontend origin here
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(cookieParser());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
