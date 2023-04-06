const Router = require("express");
const router = new Router();
const lessonRouter = require("./lessonRouter");
const courseController = require("../controllers/courseController.js");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
  "/course_add",
  checkRoleMiddleware("ADMIN"),
  courseController.create
);
router.get("/courses/:userId", courseController.getAll);
router.get("/:workname", courseController.getOne);
router.use("/:workname", lessonRouter);

module.exports = router;
