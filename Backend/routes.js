import express from "express"
import { getQuestions, executeCode, executeTest } from "./controllers/jd.controller.js"
import { login } from "./controllers/login.controller.js"

const router = express.Router();

router.get('/', function (req, res) {
    res.json({ health: "ok" });
});


router.get('/getquestions/:num', getQuestions);

router.post('/execute', executeCode);

router.post('/executeTest', executeTest)

router.post('/login', login)

export default router;