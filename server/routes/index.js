const Router = require("express");
const router = new Router();
const courseRouter = require("./courseRouter");
const userRouter = require("./userRouter");
const analiticsRouter = require("./analiticsRouter");

router.use("/", courseRouter);
router.use("/user", userRouter);
router.use("/", courseRouter);
router.use("/analitics", analiticsRouter);

module.exports = router;
