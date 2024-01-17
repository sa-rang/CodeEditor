
import JSQuestionList from "../JS_Questions.json" assert { type: "json" };
import dotenv from "dotenv"
dotenv.config()

// get question by count
const getQuestions = async (req, res) => {
    try {
        const count = req?.params?.num;
        const output = await getRandomQuestions(count)
        res.json(output);
    } catch (error) {
        console.log(error)
        res.json({ ERROR: "Problem in getting questions" });
    }
}

const getRandomQuestions = async (count = 1) => {
    let qList = structuredClone(JSQuestionList);
    let shuffledArray = qList.slice().sort(() => Math.random() - 0.5);

    //take number of tests && remove test cases from retuning obj
    return shuffledArray.slice(0, count).map(obj => {
        const { ['tests']: omittedKey, ...rest } = obj;
        return rest;
    });
}

//execute code for single script
const executeCode = async (req, res) => {
    try {
        const payload = req.body;

        let code = payload?.script || "";

        const rawResponse = await fetch(`${process.env.JD_ENDPOINT}/execute`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                script: code,
                clientId: process.env.JD_CLIENT,
                clientSecret: process.env.JD_SCR,
                language: "nodejs"
            })
        });
        const content = await rawResponse.json();

        res.json({ ...content });
    } catch (error) {
        console.log(error)
        res.json({ ERROR: "Problem in code execution" });
    }

}

//Execute the script for test cases of Questions
const executeTest = async (req, res) => {
    try {
        const payload = req.body;
        let qId = payload?.qId;
        let script = payload?.script;
        let testResults = null;

        if (qId && script) {
            testResults = await runTests(qId, script)
        }

        res.json({ output: testResults });

    } catch (error) {
        console.log(error)
        res.json({ ERROR: "Problem in code execution" });
    }
}

const runTests = async (qId, script) => {
    let questionData = await getQuestionById(qId)
    let res = { qId, results: [] }
    if (questionData) {
        res['title'] = questionData?.title

        // Use Promise.all to wait for all fetch requests to resolve
        return Promise.all(questionData?.tests.map(eachTest => validateTest(script, eachTest)))
            .then(dataArray => {
                // Handle the array of resolved data
                console.log('All fetch requests resolved:', dataArray);
                res.results = dataArray;
                return res
            })
            .catch(error => {
                // Handle errors if any of the fetch requests fail
                console.error('Error in one or more fetch requests:', error);
            });
    } else {
        return res;
    }
}

const validateTest = (script, test) => {
    script = script.replace("(testCase)", `(${test.input})`)

    return fetch(`${process.env.JD_ENDPOINT}/execute`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            script,
            clientId: process.env.JD_CLIENT,
            clientSecret: process.env.JD_SCR,
            language: "nodejs"
        })
    })
        .then(response => response.json()).then((data) => {
            //Pass case
            if (data?.output && data?.output.toString().trim() === test.output.toString()) {
                return { input: test.input, expected: test.output, actual: data?.output.trim(), result: true }
            }

            //Fail Case
            return { input: test.input, expected: test.output, actual: data?.output, result: false }

        })
        .catch(error => console.error('Error fetching data:', error));
}

const getQuestionById = async (id) => {
    try {
        let qList = structuredClone(JSQuestionList);
        return qList.find(obj => obj.qId === String(id));
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export { getQuestions, executeCode, getRandomQuestions, executeTest }
