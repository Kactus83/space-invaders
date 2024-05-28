export interface EIP712Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}

export interface SignatureMessage {
    nonce: string;
    from: string;
}

export interface EIP712Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}

export interface SignatureMessage {
    nonce: string;
    from: string;
}

export interface SignatureData {
    types: {
        EIP712Domain: Array<{ name: string; type: string; }>;
        SignatureMessage: Array<{ name: string; type: string; }>;
    };
    domain: EIP712Domain;
    primaryType: string;
    message: SignatureMessage;
}
