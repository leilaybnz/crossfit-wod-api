import DB from './db.json' assert {type: 'json'};

export const getRecordForWorkout = (workoutId) => {
    try {

        const record = DB.records.filter((record) => record.workout === workoutId); // We filter all the records that are related to the workout id out of the query parameter.

        if (!record) {
            throw {
                status: 400,
                message: `Cannot find workout with the id '${workoutId}'`
            };
        }

        return record;
    } catch (error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
}