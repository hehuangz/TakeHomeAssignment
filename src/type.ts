export type Nurse = {
    id: string;
    name: string;
    location: Location;
    yoe: number;
    acceptedOffers: number;
    canceledOffers: number;
    averageReplyTime: number;
}

export type NurseWithScore = Nurse & { score: number }

export interface Location {
    latitude: number;
    longitude: number;
}

export interface RawNurse {
    id: string;
    name: string;
    location: {
        latitude: string;
        longitude: string;
    };
    yoe: string | number;
    acceptedOffers: string | number;
    canceledOffers: string | number;
    averageReplyTime: string | number;
}
