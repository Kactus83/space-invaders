import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WalletSelectorService } from '@web3/services/wallet-selector/wallet-selector.service';
import { WalletActionService } from '@web3/services/wallet-action/wallet-action.service';
import { AbstractWeb3Wallet } from '@web3/services/wallet/web3-wallet.abstract';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'web3-wallet-connector',
    templateUrl: './wallet-connector.component.html',
    styleUrls: ['./wallet-connector.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'web3-wallet-connector',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgIf, NgFor]
})

/**
 * Component for connecting to Web3 wallets.
 * It displays available wallets and handles wallet selection and connection.
 */
export class WalletConnectorComponent implements OnInit {
    availableWallets: AbstractWeb3Wallet[] = [];
    selectedWallet: AbstractWeb3Wallet | null = null;
    isConnecting: boolean = false;

    /**
     * Constructor
     * Initializes the component with necessary services.
     * @param walletSelectorService Service for selecting wallets.
     * @param walletActionService Service for performing actions on the wallet.
     */
    constructor(
        private walletSelectorService: WalletSelectorService,
        private walletActionService: WalletActionService
    ) {}

    /**
     * OnInit lifecycle hook.
     * Retrieves the list of available wallets on initialization.
     */
    ngOnInit(): void {
        this.walletSelectorService.getAvailableWallets$().subscribe(wallets => {
            this.availableWallets = wallets;
        });
    }

    /**
     * Selects a wallet without connecting to it.
     * @param wallet The wallet to be selected.
     */
    selectWallet(wallet: AbstractWeb3Wallet): void {
        this.walletSelectorService.selectWallet(wallet);
        this.selectedWallet = wallet;
    }

    /**
     * Connects to the selected wallet.
     */
    connectToSelectedWallet(): void {
        if (!this.selectedWallet) {
            console.error('No wallet selected');
            return;
        }

        this.isConnecting = true; // Indicate that connection is in progress
        this.walletActionService.connectToActiveWallet().then(() => {
            this.isConnecting = false; // Reset connection indicator on success
        }).catch(error => {
            console.error('Failed to connect to the wallet:', error);
            this.isConnecting = false; // Reset connection indicator on error
        });
    }

    /**
     * Clear the active wallet selection.
     */
    clearSelection(): void {
        this.selectedWallet = null;
        this.walletSelectorService.clearActiveWallet();
    }
}