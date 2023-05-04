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
  answer: { type: DataTypes.TEXT },
  files: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

const Question = sequelize.define("question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quest: { type: DataTypes.STRING, allowNull: false },
});

const Helpful_info = sequelize.define("helpful_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT },
  reference: { type: DataTypes.TEXT },
});

const Homework = sequelize.define("homework", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT },
  reference: { type: DataTypes.TEXT, allowNull: false },
});

const Testing = sequelize.define("testing", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT },
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quest: { type: DataTypes.TEXT, allowNull: false },
  answer_true: { type: DataTypes.TEXT, allowNull: false },
  grade_max: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  options_answer: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

const AnswerTask = sequelize.define("answer_task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  answer: { type: DataTypes.TEXT },
  grade: { type: DataTypes.INTEGER },
});

const ResultTesting = sequelize.define("result_testing", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total_grade: { type: DataTypes.INTEGER, allowNull: false },
});

Lesson.hasOne(Testing);
Testing.belongsTo(Lesson);

Testing.hasMany(Task);
Task.belongsTo(Testing);

Task.hasMany(AnswerTask);
AnswerTask.belongsTo(Task);

User.hasOne(AnswerTask);
AnswerTask.belongsTo(User);

User.hasOne(ResultTesting);
ResultTesting.belongsTo(User);

Testing.hasMany(ResultTesting);
ResultTesting.belongsTo(Testing);

Course.hasMany(UserCourses);
User.hasMany(UserCourses);

UserCourses.belongsTo(User);
UserCourses.belongsTo(Course);

User.hasMany(Question);
Question.belongsTo(User);

User.hasOne(Answerhw);
Answerhw.belongsTo(User);

Course.hasMany(Lesson);
Lesson.belongsTo(Course);

Lesson.hasMany(Question);
Question.belongsTo(Lesson);

Lesson.hasMany(Answerhw);
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
  AnswerTask,
  Task,
  Testing,
  ResultTesting,
};
