// Enums and interfaces specific to Web3 wallets

/**
 * Blockchain network types.
 */
export enum BlockchainNetwork {
    Ethereum = 'ethereum',
    BinanceSmartChain = 'binance',
    BinanceSmartChainTestnet = 'binance testnet',
    Unknown = 'unknown',
    // ... other networks as needed
}

/**
 * State of the wallet provider.
 */
export enum WalletProviderState {
    Unavailable = 'unavailable',
    Locked = 'locked',
    Active = 'active',
    AccountChanged = 'account changed',
    Error = 'error',
    // ... other states as needed
}
