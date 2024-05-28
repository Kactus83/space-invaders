import { AbstractWeb3Wallet } from "../wallet/web3-wallet.abstract";
import { SignatureData } from "../web3-auth/web3-auth.types";

export enum Web3OverallState {
    noInit = 'NO_INIT',
    initInProgress = 'INIT_IN_PROGRESS',
    NoProvidersAvailable = 'NO_PROVIDERS_AVAILABLE',
    NoProviderSelected = 'NO_PROVIDER_SELECTED',
    NoWalletSelected = 'NO_WALLET_SELECTED',
    WalletLocked = 'WALLET_LOCKED',
    WalletConnected = 'WALLET_CONNECTED',
    UserAuthenticated = 'USER_AUTHENTICATED',
    WrongAccount = 'WRONG_ACCOUNT',
    Error = 'ERROR',
    // ... other states as needed
}

export interface Web3AuthState {
    address: string;
    signature: string;
}

export interface INonceProvider {
    getMessageForSignature(wallet: string): Promise<SignatureData>; 
    isOperational: boolean;
}


export interface Web3Config {
    nonceProvider: INonceProvider | null;
    wallets: AbstractWeb3Wallet[];
    activeWallet: AbstractWeb3Wallet | null;
    overallState: Web3OverallState;
    authState: Web3AuthState | null;
    old_AuthState: Web3AuthState | null;
}
