import { Injectable } from "@angular/core";
import { Web3StateCore } from "./web3-state-core.abstract";
import { Web3Config, Web3OverallState } from "../config/web3-config.types";
import { Web3ConfigService } from "../config/web3-config.service";
import { StateChangesDetector } from "./state-changes-detector/state-changes-detector.service";
import { StateAnomalyDetector } from "./state-anomaly-detector/state-anomaly-detector.service";
import { Web3ConfigChangeType } from "./state-changes-detector/state-changes-detector.types";
import { Web3ConfigAnomalyType } from "./state-anomaly-detector/state-anomaly-detector.types";
import { WalletProviderState } from "../wallet/web3-wallet.types";

@Injectable({
    providedIn: 'root'
})
export class Web3StateService extends Web3StateCore {

    constructor(
        web3ConfigService: Web3ConfigService, 
        changesDetector: StateChangesDetector, 
        anomalyDetector: StateAnomalyDetector
    ) {
        super(web3ConfigService, changesDetector, anomalyDetector);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Overridden methods from Web3StateCore
    // -----------------------------------------------------------------------------------------------------

    protected abstractAnomaliesProcess(): void {
        this._anomaliesDetected.forEach(anomaly => {
            switch(anomaly) {
                case Web3ConfigAnomalyType.Init:
                    this.handleInit();
                    break;
                case Web3ConfigAnomalyType.InvalidAuthState:
                    this.handleInvalidAuthState();
                    break;
                case Web3ConfigAnomalyType.ValidAuthStateButNotAuthenticated:
                    this.handleValidAuthStateButNotAuthenticated();
                    break;
                case Web3ConfigAnomalyType.UserReconnection:
                    this.handleUserReconnection();
                    break;
                // Handle other anomalies
            }
        });
    }

    protected abstractChangesProcess(): void {
        this._changesDetected.forEach(change => {
            switch(change) {
                case Web3ConfigChangeType.ActiveWalletChanged:
                    this.handleActiveWalletChange();
                    break;
                case Web3ConfigChangeType.ActiveWalletStateChanged:
                    this.handleActiveWalletStateChanged();
                    break;
                case Web3ConfigChangeType.WalletsArrayChanged:
                    this.handleWalletsArrayChange();
                    break;
                // Handle other changes
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Anomalies handlers
    // -----------------------------------------------------------------------------------------------------

    /**
     * Handles the scenario when the authentication state is invalid.
     */
    private handleInvalidAuthState(): void {
        console.log('Handling invalid auth state.');
        if(this._tempConfig.authState){

            // Store the current auth state in old_AuthState before resetting it
            this._tempConfig.old_AuthState = this._tempConfig.authState;
            this._tempConfig.authState = null;
    
            // Update the overall state to indicate the wrong account is being used
            this._tempConfig.overallState = Web3OverallState.WrongAccount;
            
            // Indicate a corrective has been applied
            this._shouldPropagateConfig = true;
        } 
    }

    /**
     * Handles the scenario when the authentication state is valid, but the user is not authenticated.
     */
    private handleValidAuthStateButNotAuthenticated(): void {
        console.log('Handling valid auth state but not authenticated.');
        // Implementation for handling valid auth state but not authenticated
        // Set the overall state to UserAuthenticated as the auth state is valid
        this._tempConfig.overallState = Web3OverallState.UserAuthenticated;
        // Indicate a corrective has been applied
        this._shouldPropagateConfig = true;
    }

    /**
     * Handles the scenario when a user reconnection is detected.
     */
    private handleUserReconnection(): void {
        console.log('Handling user reconnection.');
        // Implementation for handling user reconnection
        // Set the overall state to UserAuthenticated if the user reconnects successfully
        this._tempConfig.overallState = Web3OverallState.UserAuthenticated;
        // Indicate a corrective has been applied
        this._shouldPropagateConfig = true;
    }

    // Add other anomaly handlers

    // -----------------------------------------------------------------------------------------------------
    // @ Changes handlers
    // -----------------------------------------------------------------------------------------------------

    /**
     * Handles changes related to the initialization process.
     */
    private handleInit(): void {
        console.log('Handling initialization process.');

        const hasWallets = this._tempConfig.wallets.length > 0;
        const hasNonceProvider = this._tempConfig.nonceProvider !== null;

        if (hasWallets && hasNonceProvider) {
            this._tempConfig.overallState = Web3OverallState.NoProviderSelected;
        } else if (!hasWallets) {
            this._tempConfig.overallState = Web3OverallState.NoProvidersAvailable;
        } else if (hasWallets && !hasNonceProvider) {
            this._tempConfig.overallState = Web3OverallState.initInProgress;
        }
        
        // Indicate a corrective has been applied
        this._shouldPropagateConfig = true;
    }

    /**
     * Handles changes in the active wallet.
     */
    private handleActiveWalletChange(): void {
        console.log('Handling ActiveWallet change.');

        if (this._tempConfig.activeWallet) {
            console.log(this._tempConfig.activeWallet.getCurrentState());
            if (this._tempConfig.activeWallet.getCurrentState() != WalletProviderState.Active) {
                this._tempConfig.overallState = Web3OverallState.WalletLocked;
            }else{
                this._tempConfig.overallState = Web3OverallState.WalletConnected;
            }
        } else {
            this._tempConfig.overallState = Web3OverallState.NoProviderSelected;
        }

        // Indicate a corrective has been applied
        this._shouldPropagateConfig = true;
    }

    /**
     * Handles changes in the state of the active wallet.
     */
    private handleActiveWalletStateChanged(): void {
        console.log('Handling ActiveWallet state change.');
        if (this._tempConfig.activeWallet?.getCurrentState() === WalletProviderState.Active) {
            this._tempConfig.overallState = Web3OverallState.WalletConnected;

            // Indicate a corrective has been applied
            this._shouldPropagateConfig = true;
        }

        if (this._tempConfig.activeWallet?.getCurrentState() === WalletProviderState.AccountChanged) {
            this._tempConfig.overallState = Web3OverallState.WrongAccount;

            // Indicate a corrective has been applied
            this._shouldPropagateConfig = true;
        }
    }

    /**
     * Handles changes in the wallets array.
     */
    private handleWalletsArrayChange(): void {
        console.log('Handling WalletsArray change.');
        if (this._tempConfig.wallets.length === 0) {
            this._tempConfig.overallState = Web3OverallState.NoProvidersAvailable;
        } else if (this._tempConfig.overallState === Web3OverallState.NoProvidersAvailable || this._tempConfig.overallState === Web3OverallState.noInit) {
            this._tempConfig.overallState = Web3OverallState.NoProviderSelected;
        }
    
        // Indicate a corrective has been applied
        this._shouldPropagateConfig = true;
    }

    // Add other change handlers

    // -----------------------------------------------------------------------------------------------------
    // @ Utility methods (if needed)
    // -----------------------------------------------------------------------------------------------------

    // Implement utility methods as needed
}
