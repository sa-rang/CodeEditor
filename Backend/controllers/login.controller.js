
import { getRandomQuestions } from "./jd.controller.js"
import dotenv from "dotenv"
dotenv.config()


//login :: Dummy login not using data from DB
const login = async (req, res) => {
    try {
        let count = Number(process.env.Q_COUNT) //Number of Questions to send to user
        const payload = req.body;
        let userName = payload?.userName;
        let pass = payload?.pass;

        if (userName && userName === "JDoodle" && pass && pass === "User@123") {
            const output = await getRandomQuestions(count)
            res.json({ login: true, userName, questionList: output });
        } else {
            res.json({ login: false, message: "UserId or Password is incorrect" });
        }
    } catch (error) {
        console.log(error)
        res.json({ ERROR: "Problem in login" });
    }
}

export { login }
