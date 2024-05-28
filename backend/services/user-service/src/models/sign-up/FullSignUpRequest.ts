export interface FullSignUpRequest {
    email: string; // obligatoire
    password: string; // obligatoire
    wallet: string; // obligatoire
    signature: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}