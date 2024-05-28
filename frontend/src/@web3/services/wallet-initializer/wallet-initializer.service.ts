import { Injectable, Inject } from '@angular/core';
import { WEB3_WINDOW_TOKEN } from '../window/window.constants';
import { Web3WindowObject } from '../window/window.types';
import { AbstractWeb3Wallet } from '../wallet/web3-wallet.abstract';
import { BinanceWallet } from '../wallet/lib/binance-wallet/BinanceWallet';
import { MetamaskWallet } from '../wallet/lib/metamask/MetamaskWallet';
import { Web3ConfigService } from '../config/web3-config.service';
import { Web3OverallState } from '../config/web3-config.types';

@Injectable({
    providedIn: 'root'
})
export class WalletInitializerService {

    constructor(
        @Inject(WEB3_WINDOW_TOKEN) private web3WindowObject: Web3WindowObject,
        private web3ConfigService: Web3ConfigService
    ) {
        this.initWallets();
    }

    /**
     * Initializes wallets based on the available objects in web3WindowObject.
     * Calls 'init' on each wallet and updates the Web3Config with the initialized wallets.
     */
    private async initWallets(): Promise<void> {
        let wallets: AbstractWeb3Wallet[] = [];

        // Detect and initialize BinanceWallet if binanceChain object is available
        if (this.web3WindowObject.binanceChain) {
            const binanceWallet = new BinanceWallet(this.web3WindowObject.binanceChain);
            wallets.push(binanceWallet);
        }

        // Detect and initialize MetamaskWallet if ethereum object is available
        if (this.web3WindowObject.ethereum) {
            const metamaskWallet = new MetamaskWallet(this.web3WindowObject.ethereum);
            wallets.push(metamaskWallet);
        }

        // Initialize wallets and filter out those that are not installed
        const initializedWallets = await this.initializeAndFilterWallets(wallets);

        // Update Web3Config with the initialized wallets
        this.updateWeb3Config(initializedWallets);
    }

    /**
     * Initializes the provided wallets and filters out those that are not installed.
     * @param wallets The array of wallets to initialize.
     * @returns An array of initialized wallets.
     */
    private async initializeAndFilterWallets(wallets: AbstractWeb3Wallet[]): Promise<AbstractWeb3Wallet[]> {
        const walletInitPromises = wallets.map(async (wallet) => {
            try {
                await wallet.init();
                return wallet; // Wallet is initialized successfully
            } catch (error) {
                console.error('Error initializing wallet:', error);
                return null; // Wallet initialization failed
            }
        });

        // Wait for all wallets to initialize and filter out nulls
        return (await Promise.all(walletInitPromises)).filter(wallet => wallet !== null);
    }

    /**
     * Updates the Web3Config with the initialized wallets.
     * @param wallets The array of initialized wallets.
     */
    private updateWeb3Config(wallets: AbstractWeb3Wallet[]): void {

        console.log('Updating Web3Config with initialized wallets:', wallets);

        // Get the current Web3Config
        const currentConfig = this.web3ConfigService.getCurrentConfig();

        // Update the Web3Config with the new wallets and overall state
        this.web3ConfigService.config = {
            ...currentConfig,
            wallets: wallets
        };
    }
}
