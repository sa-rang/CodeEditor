import express from "express";
import serverless from 'serverless-http';
import router from "../../routes.js"
import cors from "cors"

const app = express();
//Enable Cross-Origins
app.use(cors())

//add the router from Routes.js
app.use('/api', router);

export const handler = serverless(app);