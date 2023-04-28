const Router = require("express");
const router = new Router();
const courseRouter = require("./courseRouter");
const userRouter = require("./userRouter");
const analiticsRouter = require("./analiticsRouter");
const testingRouter = require("./testingRouter");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.use("/", courseRouter);
router.use("/user", userRouter);
router.use("/", courseRouter);
router.use("/testing", testingRouter);
router.use("/analitics", checkRoleMiddleware("ADMIN"), analiticsRouter);

module.exports = router;
