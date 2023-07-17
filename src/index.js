import express from 'express';
import bodyParser from 'body-parser';
import {router as v1WorkoutRouer} from './v1/routes/workoutRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/api/v1/workouts', v1WorkoutRouer)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});