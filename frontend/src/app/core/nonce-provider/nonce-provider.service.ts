import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INonceProvider } from '@web3/services/config/web3-config.types';
import { SignatureData } from '@web3/services/web3-auth/web3-auth.types';

@Injectable({ providedIn: 'root' })
export class NonceProviderService implements INonceProvider {
    constructor(
        private httpClient: HttpClient
    ) {}

    /**
     * Get a structured message for signing for the specified wallet address.
     * @param wallet The wallet address for which to get the message.
     * @returns A Promise that resolves to the structured message for signing as per EIP-712.
     */
    async getMessageForSignature(wallet: string): Promise<SignatureData> {
        try {
            const response: any = await this.httpClient.get(`http://localhost:3001/nonce/${wallet}`).toPromise();
            console.log('SignatureData from backend:', response);
            return response as SignatureData;
        } catch (error) {
            console.error('Error during message retrieval:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Indicates whether the nonce provider is operational or not
    isOperational: boolean = true;
}
