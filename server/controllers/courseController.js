const { Course, Lesson, UserCourses } = require("../models/model");
const ApiError = require("../error/ApiError");

class CourseController {
  async create(req, res) {
    const { name, discription, workname } = req.body;
    const course = await Course.create({ name, discription, workname });
    return res.json(course);
  }

  async getAll(req, res) {
    const { userId } = req.params;

    const courses = await UserCourses.findAll({
      where: { userId },
      include: [{ model: Course }],
    });
    return res.json(courses);
  }

  async getOne(req, res) {
    const { workname } = req.params;
    const course = await Course.findOne({
      where: { workname },
      include: [{ model: Lesson }],
    });
    return res.json(course);
  }

  async getId(workname) {
    return await Course.findOne({ where: { workname } })
      .then((course) => {
        return course.id;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new CourseController();
