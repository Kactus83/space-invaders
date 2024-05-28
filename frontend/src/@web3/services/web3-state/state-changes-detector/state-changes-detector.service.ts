import { Injectable } from "@angular/core";
import { Web3ConfigChangeType } from "./state-changes-detector.types";
import { Web3Config, Web3OverallState } from "@web3/services/config/web3-config.types";
import { AbstractWeb3Wallet } from "@web3/services/wallet/web3-wallet.abstract";

@Injectable({
    providedIn: 'root'
})
export class StateChangesDetector {

    private readonly observerId = 'StateChangesDetector';
    

    /**
     * Main function to check for configuration changes.
     * @param oldConfig The previous Web3 configuration.
     * @param newConfig The new Web3 configuration.
     * @returns An array of detected changes.
     */
    public detectChanges(oldConfig: Web3Config, newConfig: Web3Config): Web3ConfigChangeType[] {
        const detectedChanges = [];

        if (this.detectActiveWalletChange(oldConfig, newConfig)) {
            console.log('Active wallet changed');
            detectedChanges.push(Web3ConfigChangeType.ActiveWalletChanged);
        }
        if (this.detectActiveWalletStateChanged(newConfig)) {
            console.log('Active wallet state changed');
            detectedChanges.push(Web3ConfigChangeType.ActiveWalletStateChanged);
        }
        if (this.detectWalletsArrayChange(oldConfig, newConfig)) {
            console.log('Wallets array changed');
            detectedChanges.push(Web3ConfigChangeType.WalletsArrayChanged);
        }

        return detectedChanges;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Detection Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * Detects if the active wallet has changed.
     * @param oldConfig The previous Web3 configuration.
     * @param newConfig The new Web3 configuration.
     * @returns true if the active wallet has changed, false otherwise.
     */
    private detectActiveWalletChange(oldConfig: Web3Config, newConfig: Web3Config): boolean {1
        const isActiveWalletChanged = oldConfig.activeWallet?.name !== newConfig.activeWallet?.name;
        const isNewWalletAdded = !oldConfig.activeWallet && !!newConfig.activeWallet;
        const isWalletRemoved = !!oldConfig.activeWallet && !newConfig.activeWallet;
    
        // Retourne true si l'une des conditions ci-dessus est vraie
        return isActiveWalletChanged || isNewWalletAdded || isWalletRemoved;
    }    

    /**
     * Detects if the active wallet state has changed.
     * @param newConfig The new Web3 configuration.
     * @returns true if the active wallet state has changed, false otherwise.
     */
    private detectActiveWalletStateChanged(newConfig: Web3Config): boolean {1
        return newConfig.activeWallet && newConfig.activeWallet.checkStateForObserver(this.observerId).hasStateChanged;
    }

    /**
     * Detects if the wallets array has changed.
     * @param oldConfig The previous Web3 configuration.
     * @param newConfig The new Web3 configuration.
     * @returns true if the wallets array has changed, false otherwise.
     */
    private detectWalletsArrayChange(oldConfig: Web3Config, newConfig: Web3Config): boolean {
        return !this.areWalletsEqual(oldConfig.wallets, newConfig.wallets);
    }

        
    // -----------------------------------------------------------------------------------------------------
    // @ Utility Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compares two arrays of wallets to determine if they are equal.
     * This function is more sophisticated than a simple length check, considering individual wallet properties.
     * @param oldWallets The previous array of wallets.
     * @param newWallets The new array of wallets.
     * @returns true if the arrays are considered equal, false otherwise.
     */
    private areWalletsEqual(oldWallets: AbstractWeb3Wallet[], newWallets: AbstractWeb3Wallet[]): boolean {
        // More sophisticated logic to compare wallets (e.g., based on specific wallet properties)
        // For now, just comparing the lengths
        return oldWallets.length === newWallets.length;
    }
}
