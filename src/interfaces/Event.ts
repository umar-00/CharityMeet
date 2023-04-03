export interface Event {
    id: number;
    title: string;
    address: string;
    volunteers_needed: number;
    description: string;
    created_at: Date;
    ends_at: Date;
    charity_id: string;
}

export interface EventToCreateAndUpdate {
    title: string;
    address: string;
    volunteers_needed: number;
    description: string;
    created_at: Date;
    ends_at: Date;
    charity_id: string;
}