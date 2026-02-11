export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export interface Contributor {
    id: string;
    name: string;
    mobile: string;
    boxNumber: number;
    address: string;
    place: string;
}

export interface Collection {
    id: string;
    contributorId: string;
    amount: number;
    collectedOn: Date;
    collectedBy: string;
    remarks: string;
}