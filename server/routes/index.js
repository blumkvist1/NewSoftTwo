const Router = require("express");
const router = new Router();
const courseRouter = require("./courseRouter");
const lessonRouter = require("./lessonRouter");
const userRouter = require("./userRouter");

router.use("/", courseRouter);
//router.use('/course/lesson', lessonRouter)

router.use("/user", userRouter);
router.use("/", courseRouter);

module.exports = router;
