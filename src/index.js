import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import {router as v1WorkoutRouter} from './v1/routes/workoutRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(bodyParser.json())
app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});
