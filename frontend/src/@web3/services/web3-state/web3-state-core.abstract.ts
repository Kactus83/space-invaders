import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Web3Config, Web3OverallState } from "../config/web3-config.types";
import { Web3ConfigService } from "../config/web3-config.service";
import { StateChangesDetector } from "./state-changes-detector/state-changes-detector.service";
import { StateAnomalyDetector } from "./state-anomaly-detector/state-anomaly-detector.service";
import { Web3ConfigChangeType } from "./state-changes-detector/state-changes-detector.types";
import { Web3ConfigAnomalyType } from "./state-anomaly-detector/state-anomaly-detector.types";

@Injectable({
    providedIn: 'root'
})
export abstract class Web3StateCore {
    
    // -----------------------------------------------------------------------------------------------------
    // @ State variables
    // -----------------------------------------------------------------------------------------------------
    
    private _oldConfig: Web3Config | null = null;
    protected _tempConfig: Web3Config | null = null;
    private _newConfig: Web3Config | null = null;
    protected _changesDetected: Web3ConfigChangeType[];  
    protected _anomaliesDetected: Web3ConfigAnomalyType[]; 
    protected _shouldPropagateConfig: boolean;
    private _isInitialized: boolean = false;
    private _changesDetector: StateChangesDetector;
    private _anomalyDetector: StateAnomalyDetector;
    private walletStateSubscriptions: Subscription[] = [];

    // -----------------------------------------------------------------------------------------------------
    // @ Constructor
    // -----------------------------------------------------------------------------------------------------
    
    constructor(private web3ConfigService: Web3ConfigService, changesDetector: StateChangesDetector, anomalyDetector: StateAnomalyDetector) {
        this._changesDetector = changesDetector;
        this._anomalyDetector = anomalyDetector;
        this._shouldPropagateConfig = false;

        // Subscribe to the Web3 configuration observable to process any changes.
        this.web3ConfigService.config$.subscribe((config) => {
            this.processNewWeb3Config(config);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Abstract methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Define the process details. Moves logic to a higher level.
     */
    protected abstract abstractAnomaliesProcess(): void;

    /**
     * Define the process detail. Moves logic to a higher level.
     */
    protected abstract abstractChangesProcess(): void;

    // -----------------------------------------------------------------------------------------------------
    // @ main process
    // -----------------------------------------------------------------------------------------------------

    /**
     * This function acts as the primary processor for new Web3 configurations. 
     * It should define the workflow for handling Web3 configurations changes received from config service.
     * 
     * @param newConfig The new Web3 configuration received. 
     */
    protected processNewWeb3Config(newConfig: Web3Config): void {
        console.log('Processing new Web3 configuration...');
        // store the received config
        this.handleReception(newConfig);


        // detect anomalies and changes
        this.performChecks();
        console.log('Anomalies detected:', this._anomaliesDetected, 'Changes detected:', this._changesDetected);
        
        // then process anomalies
        if (this._anomaliesDetected.length > 0) {
            this.processAnomalies();
        }

        // next process changes
        if (this._changesDetected.length > 0) {
            this.processChanges();
        }

        // Finalize the process
        this.finalizeProcess();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Main process steps
    // -----------------------------------------------------------------------------------------------------

    /**
     * Processes detected anomalies in the Web3 configuration.
     */
    protected handleReception(newConfig: Web3Config): void {
        // Clear wallet state observations
        this.clearWalletStateObservations();

        // If it is first time, initialize the default config
        if (!this._isInitialized) {
            this._oldConfig = newConfig;
            this._isInitialized = true;
        }

        this.storeNewConfig(newConfig);
    };

    /**
     * Performs checks for changes and anomalies in the Web3 configuration.
     */
    protected performChecks(): void {
        this._anomaliesDetected = this._anomalyDetector.detectAnomalies(this._newConfig);
        this._changesDetected = this._changesDetector.detectChanges(this._oldConfig, this._newConfig);
    }

    /**
     * Processes detected anomalies in the Web3 configuration.
     */
    protected processAnomalies(): void {
        this.abstractAnomaliesProcess();
    };

    /**
     * Processes detected changes in the Web3 configuration.
     */
    protected processChanges(): void {
        this.abstractChangesProcess();
    };

    /**
     * Finalizes the configuration process, potentially propagating the new configuration.
     */
    private finalizeProcess(): void {
        // store the temp config as the old config
        this._oldConfig = this._tempConfig;

        // propagate if necessary
        if (this._shouldPropagateConfig) {
            this.propagateNewConfig();

        // Or listen to internal wallet changes
        }else if (this._newConfig.activeWallet) { 
            this.observeWalletStateChanges();
        }
    }
    

    // -----------------------------------------------------------------------------------------------------
    // @ Configuration handling methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Handles the reception of a new Web3 configuration.
     * @param newConfig The new Web3 configuration received.
     */
    protected storeNewConfig(newConfig: Web3Config): void {
        // store the received config
        this._newConfig = newConfig;
        this._tempConfig = newConfig;
    }

    /**
     * Propagates the new configuration to the rest of the application.
     */
    private propagateNewConfig(): void {
        this._shouldPropagateConfig = false; // before propagating, otherwise infinite loop
        this.web3ConfigService.config = this._tempConfig;
    }

    /**
     * Observes state changes for each wallet and propagates the config if a change is detected.
     */
    protected observeWalletStateChanges(): void {
        this._newConfig.wallets.forEach(wallet => {
            const subscription = wallet.onStateChanged$().subscribe((newState) => {
                if(this._tempConfig.activeWallet.checkStateForObserver("test").hasStateChanged) {
                    console.log(`Wallet ${wallet.name} changed state to: ${newState}`);
                    this._shouldPropagateConfig = true;
                    this.propagateNewConfig();
                }
            });
            this.walletStateSubscriptions.push(subscription); 
        });
    }

    /**
     * Clear all wallet state change observations.
     * This method unsubscribes from all active wallet state change observers
     * to prevent memory leaks and ensure that only relevant changes are observed.
     */
    protected clearWalletStateObservations(): void {
        this.walletStateSubscriptions.forEach(sub => sub.unsubscribe());
        this.walletStateSubscriptions = [];
    }
}
