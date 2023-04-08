export interface Event {
    id: number;
    title: string;
    address: EventAddress | null;
    volunteers_needed: number;
    description: string;
    created_at: Date;
    ends_at: Date;
    charity_id: string;
    charity_name: string;
    distanceToAddressInKiloMeters?: number;
}

export interface EventToCreate {
    title: string;
    address: EventAddress | null;
    volunteers_needed: number;
    description: string;
    created_at: Date;
    ends_at: Date;
    charity_id: string;
    charity_name: string;
}

export interface EventToUpdate {
    id: number;
    title: string;
    address: EventAddress | null;
    volunteers_needed: number;
    description: string;
    created_at: Date;
    ends_at: Date;
}

export interface EventAddress {
    description: string;
    lat: number;
    lng: number;
}