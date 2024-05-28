import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Web3ConfigService } from '../config/web3-config.service';
import { AbstractWeb3Wallet } from '../wallet/web3-wallet.abstract';
import { Web3Config, Web3OverallState } from '../config/web3-config.types';

@Injectable({ providedIn: 'root' })
export class WalletSelectorService {
    constructor(private web3ConfigService: Web3ConfigService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Obtains the list of available wallets as an Observable.
     * @returns An Observable of the array of available wallets.
     */
    getAvailableWallets$(): Observable<AbstractWeb3Wallet[]> {
        return this.web3ConfigService.config$.pipe(
            map((config: Web3Config) => config.wallets)
        );
    }

    /**
     * Selects a wallet as the active wallet.
     * @param wallet The wallet to be set as active.
     */
    selectWallet(wallet: AbstractWeb3Wallet): void {
        const currentConfig = this.web3ConfigService.getCurrentConfig();
        this.web3ConfigService.config = {
            ...currentConfig,
            activeWallet: wallet,
        };
    }

    /**
     * Clears the active wallet selection.
     */
    clearActiveWallet(): void {
        const currentConfig = this.web3ConfigService.getCurrentConfig();
        this.web3ConfigService.config = {
            ...currentConfig,
            activeWallet: null,
        };
    }

    // ... (other methods if needed)
}
