export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export class AuthDTo {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;

    constructor(user: Admin) {
        this.id = user.id.toString();
        this.name = user.name;
        this.email = user.email;
    }

    public static from(user: Admin): AuthDTo {
        return new AuthDTo(user);
    }
}