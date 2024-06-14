import haversine from 'haversine-distance';
import { Nurse, NurseWithScore, Location, RawNurse } from './type';

/**
 * parse the list of nurse
 * @param rawData the data may contain irregularities such as non-numeric age values (e.g., "five" instead of 5), null values, and other anomalies.
 * @returns the list of nurse without irregularities
 */
const parseNurses = (rawData: RawNurse[]): Nurse[] => {
    const parsedNurses: Nurse[] = rawData.map((nurse) => {
        const parsedYoe = typeof nurse.yoe === 'string' ? parseInt(nurse.yoe) || 0 : nurse.yoe;
        const parsedAcceptedOffers = typeof nurse.acceptedOffers === 'string' ? parseInt(nurse.acceptedOffers) || 0 : nurse.acceptedOffers;
        const parsedCanceledOffers = typeof nurse.canceledOffers === 'string' ? parseInt(nurse.canceledOffers) || 0 : nurse.canceledOffers;
        const parsedReplyTime = typeof nurse.averageReplyTime === 'string' ? parseInt(nurse.averageReplyTime) || Number.MAX_SAFE_INTEGER : nurse.averageReplyTime;
        
        return {
            id: nurse.id,
            name: nurse.name,
            location: {
                latitude: parseFloat(nurse.location.latitude),
                longitude: parseFloat(nurse.location.longitude),
            },
            yoe: parsedYoe,
            acceptedOffers: parsedAcceptedOffers,
            canceledOffers: parsedCanceledOffers,
            averageReplyTime: parsedReplyTime,
        };
    });

    return parsedNurses;
};

/**
 * calculate score
 * @param nurse the list of nurse
 * @param facilityLocation The Location of the nurse going to work
 * @returns score. But the weight calculation here does not yield a number between 1 and 10, so the score will be calculated based on its relative importance.
 */
const calculateScore = (nurse: Nurse, facilityLocation: Location): number => {
    const experienceScore = nurse.yoe * 0.1;
    const distance = haversine(nurse.location, facilityLocation);
    // Assuming score is inversely proportional to distance
    const distanceScore = 1 / (distance / 1000) * 0.1; 
    const acceptedOffersScore = nurse.acceptedOffers * 0.3;
    const canceledOffersScore = nurse.canceledOffers * 0.3;
    // Assuming score is inversely proportional to reply time
    const replyTimeScore = nurse.averageReplyTime === Number.MAX_SAFE_INTEGER ? 0 : 1 / (nurse.averageReplyTime / 60) * 0.2; 
    // 
    return experienceScore + distanceScore + acceptedOffersScore - canceledOffersScore + replyTimeScore;
}

/**
 * get a new list of nurses with score
 * @param nurses Original list of nurses
 * @param facilityLocation The Location of the nurse going to work
 * @returns NurseWithScore[] 
 */
export const getRankingNurses = (nurses: RawNurse[], facilityLocation: Location): NurseWithScore[] => {
    const trimmedNurses = parseNurses(nurses);
    const scoredNurses = trimmedNurses.map((nurse) => ({
        ...nurse,
        score: calculateScore(nurse, facilityLocation),
    }));

    scoredNurses.sort((a, b) => b.score - a.score);

    return scoredNurses;
}
