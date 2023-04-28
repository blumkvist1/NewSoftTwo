const { Testing, Task } = require("../models/model");
const ApiError = require("../error/ApiError");

class TestingController {
  async createTesting(req, res) {
    const { lessonId, discription } = req.body;
    const testing = await Testing.create({ lessonId, discription });
    return res.json(testing);
  }

  async createTasks(req, res) {
    const { tasks } = req.body;
    const { testingId } = req.params;

    let createdTasks = [];
    //TODO create response with tasks
    tasks.map(async (task) => {
      const { quest, answer_true, grade_max, type, options_answer } = task;
      const createdTask = await Task.create({
        quest,
        answer_true,
        grade_max,
        type,
        options_answer,
        testingId,
      });
      //console.log(createdTask.dataValues);
    });

    return res.json({ createdTasks });
  }
}

module.exports = new TestingController();
