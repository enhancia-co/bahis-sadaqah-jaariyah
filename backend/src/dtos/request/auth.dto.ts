import { IsEmail, IsNotEmpty, Matches, MinLength, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Username is required.' })
    @IsString({ message: 'Username must be a string.' })
    @MinLength(3, { message: 'Username must be at least 3 characters long.' })
    username!: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, {
        message:
            'Password must contain at least 1 letter, 1 number, and 1 special character.',
    })
    password!: string;
}


export class SignupDto {
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    @MinLength(3, { message: 'Name must be at least 3 characters long.' })
    name!: string;

    @IsNotEmpty({ message: 'Username is required.' })
    @IsString({ message: 'Username must be a string.' })
    @MinLength(3, { message: 'Username must be at least 3 characters long.' })
    username!: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, {
        message:
            'Password must contain at least 1 letter, 1 number, and 1 special character.',
    })
    password!: string;
}


