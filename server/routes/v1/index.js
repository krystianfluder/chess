const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { notFound, catchErrors } = require("../../middleware/errors");

const authRoutes = require("./auth");
const newsletterRoutes = require("./newsletter");
const profileRoutes = require("./profile");

const router = express.Router();
router.get("/status", (req, res) =>
  res.json({
    message: "v1 is working fine",
  })
);
router.use("/auth", authRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/profile", profileRoutes);

if (process.env.NODE_ENV === "development") {
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

router.use(notFound);
router.use(catchErrors);

module.exports = router;
