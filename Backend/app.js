
import express from "express"
import router from "./routes.js"


//Create Express App
const app = express();

app.use(express.json())
//add the router from Routes.js
app.use('/api', router);

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


