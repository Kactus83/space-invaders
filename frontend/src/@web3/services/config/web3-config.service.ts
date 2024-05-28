import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WEB3_CONFIG } from './web3-config.constants';
import { Web3Config, Web3OverallState } from './web3-config.types';

@Injectable({ providedIn: 'root' })
export class Web3ConfigService {
    private _config: BehaviorSubject<Web3Config>;

    /**
     * Constructor
     * Initializes the Web3 configuration with default values.
     */
    constructor(@Inject(WEB3_CONFIG) config: Web3Config) {
        this._config = new BehaviorSubject<Web3Config>(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for the Web3 configuration.
     */
    set config(value: Web3Config) {
        console.log('set config', value);
        this._config.next(value);
    }

    get config$(): Observable<Web3Config> {
        return this._config.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the Web3 configuration to the default.
     */
    reset(): void {
        this._config.next(this._config.getValue());
    }

    /**
     * Updates the overall state of the Web3 configuration.
     * @param state The new overall state.
     */
    updateOverallState(state: Web3OverallState): void {
        const currentConfig = this._config.getValue();
        this._config.next({ ...currentConfig, overallState: state });
        console.log('updateOverallState', this._config.getValue());
    }
    
    /**
     * Gets the current Web3 configuration.
     * @returns The current Web3Config.
     */
    getCurrentConfig(): Web3Config {
        return this._config.getValue();
    }
    
    /**
     * Propage la configuration actuelle pour déclencher les souscriptions.
     * Cela peut être utile lorsque les changements internes à la configuration
     * doivent être communiqués aux abonnés.
     */
    propagateCurrentConfig(): void {
        const currentConfig = this._config.getValue();
        this._config.next(currentConfig);
        console.log('Propagated current Web3Config:', currentConfig);
    }

    // ... (other methods to manage wallets, active wallet, etc.)
}
