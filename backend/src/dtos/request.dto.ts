export interface Admin {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export interface Contributor {
    name: string;
    mobile: string;
    boxNumber: number;
    address?: string;
    place?: string;
}

export interface Collection {
    contributorId: string;
    amount: number;
    collectedOn: Date;
    collectedBy?: string;
    remarks?: string;
}
