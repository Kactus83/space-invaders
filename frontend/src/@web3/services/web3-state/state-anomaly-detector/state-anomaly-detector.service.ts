import { Injectable } from "@angular/core";
import { Web3ConfigAnomalyType } from "./state-anomaly-detector.types";
import { Web3Config, Web3OverallState } from "@web3/services/config/web3-config.types";

@Injectable({
    providedIn: 'root'
})
export class StateAnomalyDetector {

    /**
     * Main function to check for configuration anomalies.
     * @param newConfig The new Web3 configuration.
     * @returns An array of detected anomalies.
     */
    public detectAnomalies(newConfig: Web3Config): Web3ConfigAnomalyType[] {
        const detectedAnomalies = [];

        if (this.detectInit(newConfig)) {
            console.log('Init state changed');
            detectedAnomalies.push(Web3ConfigAnomalyType.Init);
        }
        if (this.detectInvalidAuthState(newConfig)) {
            console.log('Invalid auth state detected');
            detectedAnomalies.push(Web3ConfigAnomalyType.InvalidAuthState);
        }
        if (this.detectValidAuthStateButNotAuthenticated(newConfig)) {
            console.log('Valid auth state but not authenticated anomaly detected');
            detectedAnomalies.push(Web3ConfigAnomalyType.ValidAuthStateButNotAuthenticated);
        }
        if (this.detectUserReconnection(newConfig)) {
            console.log('User reconnection anomaly detected');
            detectedAnomalies.push(Web3ConfigAnomalyType.UserReconnection);
        }

        return detectedAnomalies;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Detection Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * Detects if the initialization state has changed.
     * @param newConfig The new Web3 configuration.
     * @returns true if the init state has changed, false otherwise.
     */
    private detectInit(newConfig: Web3Config): boolean {
        return newConfig.overallState === Web3OverallState.noInit || newConfig.overallState === Web3OverallState.initInProgress;
    }

    /**
     * Detects if the authentication state is invalid.
     * @param newConfig The new Web3 configuration.
     * @returns true if the authentication state is invalid, false otherwise.
     */
    private detectInvalidAuthState(newConfig: Web3Config): boolean {
        return (newConfig.authState || newConfig.old_AuthState) && !this.isAuthStateValid(newConfig);
    }

    /**
     * Detects the scenario where the authentication state is valid, but the user is not authenticated.
     * @param newConfig The new Web3 configuration.
     * @returns true if the authentication state is valid but the user is not authenticated.
     */
    private detectValidAuthStateButNotAuthenticated(newConfig: Web3Config): boolean {
        return newConfig.overallState !== Web3OverallState.UserAuthenticated && this.isAuthStateValid(newConfig);
    }

    /**
     * Detects the scenario of a user reconnection.
     * @param newConfig The new Web3 configuration.
     * @returns true if a user reconnection is detected.
     */
    private detectUserReconnection(newConfig: Web3Config): boolean {
        return !newConfig.authState && newConfig.old_AuthState && this.areAddressesEqual(newConfig.activeWallet?.getCurrentActiveAddress(), newConfig.old_AuthState.address);
    }

        
    // -----------------------------------------------------------------------------------------------------
    // @ Utility Functions
    // -----------------------------------------------------------------------------------------------------

    /**
     * Checks if the authentication state is valid.
     * Compares the active wallet address with the address in the authentication state.
     * @param config The current Web3 configuration.
     * @returns true if the authentication state is valid, false otherwise.
     */
    private isAuthStateValid(config: Web3Config): boolean {
        const activeWallet = config.activeWallet;
        const authState = config.authState;
        
        // Check if both the active wallet and auth state are present
        if (activeWallet && authState) {
            const activeAddress = activeWallet.getCurrentActiveAddress();
            // Compare addresses case-insensitively and trim to avoid whitespace issues
            return activeAddress?.toLowerCase().trim() === authState.address.toLowerCase().trim();
        }
        
        // If either the active wallet or auth state is missing, consider the auth state as invalid
        return false;
    }
    
    /**
     * Compares two addresses to determine if they are equal.
     * @param address1 The first address.
     * @param address2 The second address.
     * @returns true if the addresses are equal, false otherwise.
     */
    private areAddressesEqual(address1: string | undefined, address2: string | undefined): boolean {
        if (!address1 || !address2) {
            return false;
        }
        return address1.toLowerCase().trim() === address2.toLowerCase().trim();
    }
}
