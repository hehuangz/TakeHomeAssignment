import haversine from 'haversine-distance';
import { getRankingNurses } from '../index';
import { Location, RawNurse } from '../type';

// Mock haversine function
jest.mock('haversine-distance', () => jest.fn());

describe('getRankingNurses', () => {
    const rawNurses: RawNurse[] = [
        {
            id: '1',
            name: 'Nurse A',
            location: { latitude: '34.0522', longitude: '-118.2437' },
            yoe: '5',
            acceptedOffers: '10',
            canceledOffers: '2',
            averageReplyTime: '30',
        },
        {
            id: '2',
            name: 'Nurse B',
            location: { latitude: '40.7128', longitude: '-74.0060' },
            yoe: '3',
            acceptedOffers: '8',
            canceledOffers: '1',
            averageReplyTime: '45',
        },
    ];

    const facilityLocation: Location = { latitude: 37.7749, longitude: -122.4194 };

    beforeEach(() => {
        (haversine as unknown as jest.Mock).mockImplementation((loc1, loc2) => {
            if (loc1.latitude === 34.0522 && loc1.longitude === -118.2437) return 559021; // Distance from LA to SF
            if (loc1.latitude === 40.7128 && loc1.longitude === -74.0060) return 4123228; // Distance from NY to SF
            return 0;
        });
    });

    it('should correctly parse and score nurses', () => {
        const result = getRankingNurses(rawNurses, facilityLocation);

        expect(result).toHaveLength(2);

        // Check the structure and values of the parsed nurses
        expect(result[0]).toMatchObject({
            id: '1',
            name: 'Nurse A',
            location: { latitude: 34.0522, longitude: -118.2437 },
            yoe: 5,
            acceptedOffers: 10,
            canceledOffers: 2,
            averageReplyTime: 30,
            score: expect.any(Number), // score will be calculated based on the mock distances
        });

        expect(result[1]).toMatchObject({
            id: '2',
            name: 'Nurse B',
            location: { latitude: 40.7128, longitude: -74.0060 },
            yoe: 3,
            acceptedOffers: 8,
            canceledOffers: 1,
            averageReplyTime: 45,
            score: expect.any(Number),
        });

        // Check the order based on scores
        expect(result[0].score).toBeGreaterThan(result[1].score);
    });

});
