import fs from 'fs';

export const saveToDatabase = (DB) => {
    fs.writeFileSync('./src/databases/db.json', JSON.stringify(DB, null, 2), {
        encoding: 'utf-8',
    });
}