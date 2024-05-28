import { SignatureData } from '@web3/services/web3-auth/web3-auth.types';
import { AbstractWeb3Wallet } from '../../web3-wallet.abstract';
import { BlockchainNetwork, WalletProviderState } from '../../web3-wallet.types';

export class BinanceWallet extends AbstractWeb3Wallet {
    /**
     * Constructor
     * Initializes the wallet with the provided Binance Chain object.
     * @param binanceChain The Binance Chain object from the window.
     */
    constructor(private binanceChain: any) {
        super('binance');
        // Initialize with default values or based on the Binance Chain object
        this.init();
        this.handleChanges();
        this.name = 'binance';
        this.iconPath = './assets/icons/Binance.svg'; 
    }

    /**
     * Initializes the wallet.
     */
    async init(): Promise<void> {
        console.log('Initializing Binance wallet...');
        if (this.binanceChain) {
            this.state.next(WalletProviderState.Locked); // Default to locked until 'connect()' is called
            this.activeAddress.next(this.binanceChain.selectedAddress || null);
            // Additional logic to determine the current network and update this.activeNetwork
            // ...
        } else {
            this.state.next(WalletProviderState.Unavailable);
        }
    }

    /**
     * Connects to the Binance wallet.
     */
    async connect(): Promise<void> {
        if (!this.binanceChain) {
            console.error('Binance Chain is not available.');
            this.state.next(WalletProviderState.Unavailable);
            return;
        }

        try {
            // Logic to connect to the wallet, update the state, active address and network
            // this.binanceChain...
            // Update state, active address, and network
            this.state.next(WalletProviderState.Active);
            // ...
        } catch (error) {
            console.error('Error connecting to Binance Wallet:', error);
            this.state.next(WalletProviderState.Error);
        }
    }

    /**
     * Requests to change the active blockchain network.
     */
    async requestChangeNetwork(network: BlockchainNetwork): Promise<void> {
        console.log('Changing network is not implemented yet for Binance Wallet.');
        // Implementation for changing the network in Binance Wallet
        // ...
    }

    /**
     * Requests to change the active account.
     */
    async requestChangeAccount(): Promise<void> {
        console.log('Requesting account change is not implemented yet for Binance Wallet.');
        // Implementation for changing the account in Binance Wallet
        // ...
    }

    /**
     * Signs a message with the active wallet address.
     */
    async signMessage(data: SignatureData): Promise<string> {
        if (!this.binanceChain) {
            throw new Error('Binance Chain is not installed');
        }

        // Logic to sign a message with the active wallet address
        // const signature = await this.binanceChain...
        return 'signature'; // Replace with actual signature
    }
        
    /**
     * Listen and handle changes in Binance Chain to update states.
     */
    async handleChanges(): Promise<void> {
        // Listen for changes in the accounts
        this.binanceChain.on('accountsChanged', (accounts: string[]) => {
            console.log('Accounts changed:', accounts);
            if (accounts.length === 0) {
                // No accounts are active
                this.activeAddress.next(null);
                this.state.next(WalletProviderState.Locked);
            } else {
                // An account is active
                this.activeAddress.next(accounts[0]);
                if(this.lastConnectionAddress.getValue() === accounts[0]) {
                    this.state.next(WalletProviderState.Active);
                } else {
                    this.state.next(WalletProviderState.AccountChanged);
                }
            }
        });

        // Listen for changes in the network
        this.binanceChain.on('chainChanged', (chainId: string) => {
            // Convert chainId to a number and update the active network
            const networkId = parseInt(chainId, 16);
            let network: BlockchainNetwork;

            switch (networkId) {
                case 56:
                    network = BlockchainNetwork.BinanceSmartChain;
                    break;
                case 97:
                    network = BlockchainNetwork.BinanceSmartChainTestnet;
                    break;
                // Add other networks if necessary
                default:
                    network = BlockchainNetwork.Unknown;
                    break;
            }

            this.activeNetwork.next(network);

            // If the network is unknown, we might consider the wallet as in an error state
            if (network === BlockchainNetwork.Unknown) {
                this.state.next(WalletProviderState.Error);
            } else {
                this.state.next(WalletProviderState.Active);
            }
        });
    }

}
