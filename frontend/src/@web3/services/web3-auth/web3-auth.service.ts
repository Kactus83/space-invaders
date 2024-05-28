import { Injectable } from '@angular/core';
import { Web3ConfigService } from '../config/web3-config.service';
import { take } from 'rxjs';
import { SignatureData } from './web3-auth.types';

@Injectable({ providedIn: 'root' })
export class Web3AuthService {

    constructor(
        private web3ConfigService: Web3ConfigService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Request a signature from the active wallet to authenticate the user.
     */
    async requestSignature(): Promise<void> {
        const config = this.web3ConfigService.getCurrentConfig();
        const activeWallet = config.activeWallet;
        console.log('Active wallet:', activeWallet);
    
        if (activeWallet && config.nonceProvider?.isOperational) {
            const signatureData: SignatureData = await config.nonceProvider.getMessageForSignature(activeWallet.getCurrentActiveAddress() ?? '');
            console.log('SignatureData:', signatureData);
    
            // Utiliser eth_signTypedData_v4 pour signer les données EIP-712
            const signature = await activeWallet.signMessage(signatureData);
            console.log('Signature:', signature);
    
            activeWallet.getActiveAddress$().pipe(take(1)).subscribe(activeAddress => {
                this.updateAuthState(activeAddress, signature);
            });
        } else {
            throw new Error('No active wallet or operational nonce provider to request signature.');
        }
    }

    /**
     * Update the authentication state in the Web3Config.
     * @param address The wallet address.
     * @param signature The signature for authentication.
     */
    private updateAuthState(address: string | null, signature: string | null): void {
        const currentConfig = this.web3ConfigService.getCurrentConfig();
        this.web3ConfigService.config = {
            ...currentConfig,
            authState: address && signature ? { address, signature } : null
        };
    }
}
