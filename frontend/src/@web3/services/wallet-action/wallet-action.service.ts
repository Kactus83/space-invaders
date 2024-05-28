import { Injectable } from '@angular/core';
import { Web3ConfigService } from '../config/web3-config.service';
import { BlockchainNetwork } from '../wallet/web3-wallet.types';
import { SignatureData } from '../web3-auth/web3-auth.types';

@Injectable({ providedIn: 'root' })
export class WalletActionService {
    constructor(private web3ConfigService: Web3ConfigService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connects to the active wallet.
     */
    async connectToActiveWallet(): Promise<void> {
        const activeWallet = this.web3ConfigService.getCurrentConfig().activeWallet;
        if (activeWallet) {
            console.log('Connecting to active wallet...');
            await activeWallet.connect().then(() => {this.web3ConfigService.propagateCurrentConfig();});  
        } else {
            throw new Error('No active wallet to connect to.');
        }
    }

    /**
     * Requests a change of the active blockchain network in the active wallet.
     * @param network The desired blockchain network.
     */
    async changeNetworkInActiveWallet(network: BlockchainNetwork): Promise<void> {
        const activeWallet = this.web3ConfigService.getCurrentConfig().activeWallet;
        if (activeWallet) {
            await activeWallet.requestChangeNetwork(network);
            this.web3ConfigService.propagateCurrentConfig();
        } else {
            throw new Error('No active wallet to change network.');
        }
    }

    /**
     * Requests a change of the active account in the active wallet.
     */
    async changeAccountInActiveWallet(): Promise<void> {
        const activeWallet = this.web3ConfigService.getCurrentConfig().activeWallet;
        if (activeWallet) {
            await activeWallet.requestChangeAccount();
            this.web3ConfigService.propagateCurrentConfig();
        } else {
            throw new Error('No active wallet to change account.');
        }
    }

    /**
     * Signs a message using the active wallet.
     * @param message The message to sign.
     * @returns The message signature.
     */
    async signMessageInActiveWallet(message: SignatureData): Promise<string> {
        const activeWallet = this.web3ConfigService.getCurrentConfig().activeWallet;
        if (activeWallet) {
            const signature = await activeWallet.signMessage(message);
            this.web3ConfigService.propagateCurrentConfig();
            return signature;
        } else {
            throw new Error('No active wallet to sign message.');
        }
    }

    // ... (other methods if needed)
}
