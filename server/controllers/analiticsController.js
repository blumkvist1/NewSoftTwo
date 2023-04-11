const { Course, Lesson, UserCourses, User } = require("../models/model");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db");

const ApiError = require("../error/ApiError");
const userController = require("./userController");

class AnaliticsController {
  async getCoursesAnalize(req, res) {
    const analize = await sequelize.query(
      'SELECT courses.id, courses."name", courses."createdAt", courses."updatedAt", courses.workname, COUNT(*) AS users_count FROM user_courses LEFT JOIN courses ON courses.id = user_courses."courseId" GROUP BY courses.id;'
    );
    const totalUsers = await userController.getCountAllUsers();
    analize[0].map((item) => {
      const popularity = (item.users_count / totalUsers[0][0].count) * 100;
      item.popularity = popularity;
    });
    return res.json(analize[0]);
  }

  async getUsersAnalize(req, res) {
    const analize = await sequelize.query(
      'SELECT users.id, users."name", users."createdAt", users."role", users.email, users.lastname, COUNT(*) AS courses_count FROM user_courses LEFT JOIN users ON users.id = user_courses."userId" GROUP BY users.id;'
    );
    return res.json(analize[0]);
  }
}

module.exports = new AnaliticsController();
