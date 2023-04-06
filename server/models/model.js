const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { databaseVersion } = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  education: { type: DataTypes.TEXT },
});

const UserCourses = sequelize.define("user_courses", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Course = sequelize.define("course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  discription: { type: DataTypes.TEXT },
  workname: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Lesson = sequelize.define("lesson", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.INTEGER, allowNull: false },
  video: { type: DataTypes.STRING },
  presentation: { type: DataTypes.STRING },
  datetime: { type: DataTypes.DATE, allowNull: false },
});

const Answerhw = sequelize.define("answerhw", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  answer: { type: DataTypes.STRING },
});

const Question = sequelize.define("question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quest: { type: DataTypes.STRING, allowNull: false },
});

const Helpful_info = sequelize.define("helpful_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT },
  reference: { type: DataTypes.TEXT, allowNull: false },
});

const Homework = sequelize.define("homework", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT },
  reference: { type: DataTypes.TEXT, allowNull: false },
});

Course.hasMany(UserCourses);
User.hasMany(UserCourses);

UserCourses.belongsTo(User);
UserCourses.belongsTo(Course);

User.hasMany(Question);
Question.belongsTo(User);

User.hasMany(Answerhw);
Answerhw.belongsTo(User);

Course.hasMany(Lesson);
Lesson.belongsTo(Course);

Lesson.hasMany(Question);
Question.belongsTo(Lesson);

Lesson.hasOne(Answerhw);
Answerhw.belongsTo(Lesson);

Lesson.hasMany(Helpful_info);
Helpful_info.belongsTo(Lesson);

Lesson.hasOne(Homework);
Homework.belongsTo(Lesson);

module.exports = {
  User,
  UserCourses,
  Course,
  Lesson,
  Answerhw,
  Question,
  Helpful_info,
  Homework,
};
