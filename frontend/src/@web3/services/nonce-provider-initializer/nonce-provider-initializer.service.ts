import { Injectable } from '@angular/core';
import { Web3ConfigService } from '../config/web3-config.service';
import { INonceProvider } from '../config/web3-config.types';

@Injectable({ providedIn: 'root' })
export class NonceProviderInitializer {
    constructor(
        private web3ConfigService: Web3ConfigService,
    ) {}

    /**
     * Set the nonce provider and mark it as operational.
     */
    setNonceProvider(nonceProvider: INonceProvider): void {
        nonceProvider.isOperational = true; // Mark it as operational
        const currentConfig = this.web3ConfigService.getCurrentConfig();
        this.web3ConfigService.config = {
            ...currentConfig,
            nonceProvider: nonceProvider
        };
    }
}
