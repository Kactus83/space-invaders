import { BehaviorSubject, Observable, distinctUntilChanged, filter } from 'rxjs';
import { BlockchainNetwork, WalletProviderState } from './web3-wallet.types';
import { SignatureData } from '../web3-auth/web3-auth.types';

/**
 * Abstract class for Web3 wallets.
 * Defines the basic operations and properties that all wallets must implement.
 */
export abstract class AbstractWeb3Wallet {

    // Identifier and icon for the wallet
    public name: string = 'abstract';
    public iconPath: string = '';

    // Observable for the current state of the wallet (connected, disconnected, etc.)
    protected state: BehaviorSubject<WalletProviderState>;
    private lastStateByObserver: Map<string, WalletProviderState> = new Map();

    // Last connection address of the wallet
    protected lastConnectionAddress: BehaviorSubject<string | null>;

    // Active address of the wallet
    protected activeAddress: BehaviorSubject<string | null>;

    // Current blockchain network
    protected activeNetwork: BehaviorSubject<BlockchainNetwork>;

    /**
     * Constructor
     * Initializes the wallet with default values.
     */
    constructor(_name: string) {
        // Initialize default values
        this.name = _name;
        this.state = new BehaviorSubject<WalletProviderState>(WalletProviderState.Unavailable);
        this.lastConnectionAddress = new BehaviorSubject<string | null>(null);
        this.activeAddress = new BehaviorSubject<string | null>(null);
        this.activeNetwork = new BehaviorSubject<BlockchainNetwork>(BlockchainNetwork.Unknown);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setters & geters for the wallet state
    // -----------------------------------------------------------------------------------------------------

    
    /**
     * Gets the current state of the wallet.
     * @returns The current state of the wallet.
     */
    public getCurrentState(): WalletProviderState {
        return this.state.getValue();
    }

    /**
     * Gets the current active address of the wallet.
     * @returns The current active address.
     */
    public getCurrentActiveAddress(): string | null {
        return this.activeAddress.getValue();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Abstract methods that each wallet must implement
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initializes the wallet. This method should handle the logic for detecting if the wallet is installed
     * and update the state accordingly.
     */
    abstract init(): Promise<void>;

    /**
     * Connects to the wallet and starts listening for changes in account or network.
     * Updates the state with new account details and network when a change is detected.
     */
    abstract connect(): Promise<void>;

    /**
     * Requests to change the active blockchain network.
     * @param network The desired blockchain network.
     * @returns A Promise that resolves when the network change is successful.
     */
    abstract requestChangeNetwork(network: BlockchainNetwork): Promise<void>;

    /**
     * Requests to change the active account.
     * @returns A Promise that resolves when the account change is successful.
     */
    abstract requestChangeAccount(): Promise<void>;

    /**
     * Signs a message with the active wallet address.
     * @param message The message to sign.
     * @returns A Promise that resolves with the message signature.
     */
    abstract signMessage(message: SignatureData): Promise<string>;

    /**
     * Listen and handle changes in web3 objects to update states.
     */
    abstract handleChanges(): Promise<void>;

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods to access the state and details of the wallet as observables
    // -----------------------------------------------------------------------------------------------------

    /**
     * Returns an Observable of the current state of the wallet.
     * @returns An Observable of the state of the wallet.
     */
    public getState$(): Observable<WalletProviderState> {
        return this.state.asObservable();
    }

    /**
     * Returns an Observable of the active address of the wallet.
     * @returns An Observable of the active address.
     */
    public getActiveAddress$(): Observable<string | null> {
        return this.activeAddress.asObservable();
    }

    /**
     * Returns an Observable of the active blockchain network.
     * @returns An Observable of the active blockchain network.
     */
    public getActiveNetwork$(): Observable<BlockchainNetwork> {
        return this.activeNetwork.asObservable();
    }
    
    /**
     * Returns an Observable that emits only when the state of the wallet changes.
     * @returns An Observable of the state changes of the wallet.
     */
    public onStateChanged$(): Observable<WalletProviderState> {
        return this.state.asObservable().pipe(
            distinctUntilChanged()
        );
    }

    /**
     * Checks the current state of the wallet and whether it has changed since the last check by the observer.
     * @param observerId Unique identifier for the observer.
     * @returns An object containing the current state and a flag indicating whether it has changed.
     */
    checkStateForObserver(observerId: string): { hasStateChanged: boolean, currentState: WalletProviderState } {
        const currentState = this.state.getValue();
        const lastState = this.lastStateByObserver.get(observerId);
        const hasStateChanged = lastState !== currentState;

        // Update the last known state for this observer
        this.lastStateByObserver.set(observerId, currentState);

        return { hasStateChanged, currentState };
    }
}
