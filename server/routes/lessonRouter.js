const Router = require('express');
const router = new Router();
const lessonController = require('../controllers/lessonController.js');


router.post('/add_lesson', lessonController.create)
router.get('/lessons', lessonController.getAll)
router.get('/lesson/:number', lessonController.getOne)



module.exports = router