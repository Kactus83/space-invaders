export interface Web3SignUpRequest {
    wallet: string; // obligatoire
    signature: string; // obligatoire
    name: string | null; // facultatif
    company: string | null; // facultatif
}