export interface User {
    email: string;
    user_id: string;
}

export interface Charity {
    name: string;
    is_verified: boolean;
    // user_id: string;
}

export interface CharityToCreate {
    name: string;
    is_verified: boolean;
    user_id: string;
}