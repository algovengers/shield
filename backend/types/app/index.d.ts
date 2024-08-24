interface User {
    id: string;
    name: string;
    emailId: string;
    password: string;
    refreshToken: string;
}

interface Admin {
    id: string;
    username: string;
    password: string;
    refreshToken?: string;
}

type MiddlewareAdmin = Omit<Admin,"password" | "refreshToken">
type MiddlewareUser = Omit<User,"password" | "refreshToken">