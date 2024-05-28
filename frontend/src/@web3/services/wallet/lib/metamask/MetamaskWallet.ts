import { Injectable, Inject } from '@angular/core';
import { ETHEREUM_TOKEN } from '@web3/services/window/window.constants';
import { AbstractWeb3Wallet } from '../../web3-wallet.abstract';
import { BlockchainNetwork, WalletProviderState } from '../../web3-wallet.types';
import { SignatureData } from '@web3/services/web3-auth/web3-auth.types';
@Injectable({
    providedIn: 'root'
})
export class MetamaskWallet extends AbstractWeb3Wallet {

    /**
     * Constructor
     * Initializes the wallet with the provided Ethereum object.
     * @param ethereum The Ethereum object from the window.
     */
    constructor(@Inject(ETHEREUM_TOKEN) private ethereum: any) {
        super('metamask');
        this.name = 'metamask';
        this.iconPath = './assets/icons/Metamask.svg'; 
    }

    /**
     * Initializes the wallet.
     */
    async init(): Promise<void> {
        console.log('Initializing MetaMask wallet...');

        // handle web3 changes in real time to update state
        this.handleChanges();

        if (this.ethereum) {
            this.state.next(WalletProviderState.Locked); // Default to locked until 'connect()' is called
        } else {
            this.state.next(WalletProviderState.Unavailable);
        }
    }

    /**
     * Connects to the MetaMask wallet.
     */
    async connect(): Promise<void> {
        if (!this.ethereum) {
            console.error('MetaMask is not available.');
            this.state.next(WalletProviderState.Unavailable);
            return;
        }

        try {
            // Logic to connect to the wallet, update the state, active address and network
            const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                console.error('No accounts found.');
                this.state.next(WalletProviderState.Locked);
                return;
            }

            // Update state, active address, and network
            this.activeAddress.next(accounts[0]);
            this.lastConnectionAddress.next(accounts[0]);
            this.state.next(WalletProviderState.Active);
            console.log('Connected to MetaMask:', this.state.getValue());
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            this.state.next(WalletProviderState.Error);
        }
    }

    /**
     * Requests to change the active blockchain network.
     */
    async requestChangeNetwork(network: BlockchainNetwork): Promise<void> {
        console.log('Changing network is not implemented yet for MetaMask.');
        // Implementation for changing the network in MetaMask
        // ...
    }

    /**
     * Requests to change the active account.
     */
    async requestChangeAccount(): Promise<void> {
        console.log('Requesting account change is not implemented yet for MetaMask.');
        // Implementation for changing the account in MetaMask
        // ...
    }

    /**
     * Signs a message with the active wallet address.
     */
    async signMessage(message: SignatureData): Promise<string> {
        // Check if the MetaMask extension is installed and accessible
        if (!this.ethereum) {
            throw new Error('MetaMask is not installed or not accessible.');
        }

        try {
            // Request the MetaMask to sign the message with the user's active address
            console.log('Signing message with MetaMask:', JSON.stringify(message)); // Utilisez JSON.stringify(data) pour afficher les données
            const address = this.activeAddress.getValue(); // Utilisez this.activeAddress.getValue() pour obtenir l'adresse
            const signature = await this.ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(message)] // Utilisez address et JSON.stringify(data) comme paramètres
            });

            // Return the signature received from MetaMask
            return signature;
        } catch (error) {
            console.error('Error signing message with MetaMask:', error);
            throw error; // Rethrow the error for handling by the caller
        }
    }
        
    /**
     * Listen and handle changes in Ethereum to update states.
     */
    async handleChanges(): Promise<void> {
        // Listen for changes in the accounts
        this.ethereum.on('accountsChanged', (accounts: string[]) => {
            console.log('Accounts changed:', accounts);
            if (accounts.length === 0) {
                // No accounts are active
                this.activeAddress.next(null);
                this.state.next(WalletProviderState.Locked);
            } else {
                // An account is active
                this.activeAddress.next(accounts[0]);
                if(this.lastConnectionAddress === this.activeAddress) {
                    this.state.next(WalletProviderState.Active);
                }else{
                    this.state.next(WalletProviderState.AccountChanged);
                }
                
            }
        });

        // Listen for changes in the network
        this.ethereum.on('chainChanged', (chainId: string) => {
            // Convert chainId to a number and update the active network
            const networkId = parseInt(chainId, 16);
            let network: BlockchainNetwork;

            switch (networkId) {
                // Define mappings from network IDs to your BlockchainNetwork enum
                case 1: // Mainnet
                    network = BlockchainNetwork.Ethereum;
                    break;
                // ... other networks as needed
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
