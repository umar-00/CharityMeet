export interface User {
    email: string;
    user_id: string;
}

export interface Charity {
    name: string;
    is_verified: boolean;
    contact_email: string | null;
    contact_phone: string | null;
}

export interface CharityToCreate {
    name: string;
    is_verified: boolean;
    user_id: string;
    contact_email: string;
    contact_phone: string;
}