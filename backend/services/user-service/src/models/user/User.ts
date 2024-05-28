export interface User {
    id: number;
    name: string | null;
    wallet: string | null;
    email: string | null;
    password: string | null;
    company: string | null;
    avatar: string | null;
    status: string | null;
    isEmailVerified: boolean;
    isWalletVerified: boolean;
    isLocked: boolean; 
    createdAt: Date;
    updatedAt: Date;
}
