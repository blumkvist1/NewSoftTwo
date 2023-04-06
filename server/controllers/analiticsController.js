const { Course, Lesson, UserCourses, User } = require("../models/model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db");

const ApiError = require("../error/ApiError");

class AnaliticsController {
  async getCoursesAnalize(req, res) {
    const analize = await sequelize.query(
      'select "courses"."id", "courses"."name", courses.workname, "users"."name", users.id, users.role from user_courses left join courses on user_courses."courseId" = courses.id left join users on user_courses."userId" = users.id;'
    );

    return res.json(analize[0]);
  }
  // select courses.id, courses.name, courses.workname, users.name, users.id, users.role from user_courses left join courses on user_courses."courseId" = courses.id left join users on user_courses."userId" = users.id;

  async getUsersAnalize(req, res) {
    const { workname } = req.params;
    const course = await Course.findOne({
      where: { workname },
      include: [{ model: Lesson }],
    });
    return res.json(course);
  }
}

module.exports = new AnaliticsController();
