/**
 * Enum for the different types of sign-up requests.
 */
export enum SignUpType {
    Classic = 'CLASSIC',
    Web3 = 'WEB3',
    Full = 'FULL'
}

export interface ClassicSignInRequest {
    email: string;
    password: string;
}

export interface Web3SignInRequest {
    wallet: string; // obligatoire
    signature: string; // obligatoire
}

export interface ClassicSignUpRequest {
    email: string; // obligatoire
    password: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}

export interface FullSignUpRequest {
    email: string; // obligatoire
    password: string; // obligatoire
    wallet: string; // obligatoire
    signature: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}

export interface Web3SignUpRequest {
    wallet: string; // obligatoire
    signature: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}