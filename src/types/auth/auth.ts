export interface ResponseUserInfo {
    email?: string;
    username?: string;
    roles?: string[];
    token?: string;
}


export interface UserLoginRequest {
    email: string;
    password: string;
}


export interface RegisterRequest {
    /**
     * The first name of the user
     * Example: "John"
     */
    firstName: string;

    /**
     * The last name of the user
     * Example: "Doe"
     */
    lastName: string;

    /**
     * The email address of the user
     * Example: "john.doe@example.com"
     */
    email: string;

    /**
     * The password of the user
     * Example: "P@ssw0rd!"
     */
    password: string;

    /**
     * The confirmed password of the user
     * Example: "P@ssw0rd!"
     */
    confirmPassword: string;

    /**
     * The phone number of the user
     * Example: "+1234567890"
     */
    phone?: string;
};
