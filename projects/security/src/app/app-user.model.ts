export class AppUser {
    userId: string | undefined;
    userName: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;

    constructor(userId: string | undefined,
        userName: string | undefined,
        firstName: string | undefined,
        lastName: string | undefined,
        email: string | undefined) {
        
        this.userId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
