export interface ClassicSignUpRequest {
    email: string; // obligatoire
    password: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}