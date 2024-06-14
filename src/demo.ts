import nurses from './clinician.json';
import * as fs from 'fs';
import { getRankingNurses } from './index';

const outputPath = './src/output.json';

// The Location of the nurse going to work
const facilityLocation = {
    latitude: -28.4473,
    longitude: 143.6123
}

// New list of nurses with score
const nursesWithScore = getRankingNurses(nurses, facilityLocation);

const jsonData = JSON.stringify(nursesWithScore, null, 2)

fs.writeFile(outputPath, jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file has been saved.');
    }
});