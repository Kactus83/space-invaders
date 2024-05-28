import { Provider } from '@angular/core';
import { WINDOW, WEB3_WINDOW_TOKEN } from './services/window/window.constants';
import { WindowService } from './services/window/window.service';
import { Web3ConfigService } from './services/config/web3-config.service';
import { WalletInitializerService } from './services/wallet-initializer/wallet-initializer.service';
import { WalletSelectorService } from './services/wallet-selector/wallet-selector.service';
import { WalletActionService } from './services/wallet-action/wallet-action.service';
import { WEB3_CONFIG } from './services/config/web3-config.constants';
import { Web3AuthService } from './services/web3-auth/web3-auth.service';
import { Web3OverallState } from './services/config/web3-config.types';
import { Web3StateService } from './services/web3-state/web3-state.service';
import { NonceProviderInitializer } from './services/nonce-provider-initializer/nonce-provider-initializer.service';
import { StateAnomalyDetector } from './services/web3-state/state-anomaly-detector/state-anomaly-detector.service';
import { StateChangesDetector } from './services/web3-state/state-changes-detector/state-changes-detector.service';

export const provideWeb3Core = (): Array<Provider> => {
    console.log('provideWeb3Core');
    const providers: Array<Provider> = [
        // Fournir le token WINDOW au WindowService
        WindowService,
        {
            provide: WINDOW,
            useFactory: () => window
        },

        // Fournir le token WEB3_WINDOW_TOKEN pour accéder à l'objet Web3WindowObject depuis le WindowService
        {
            provide: WEB3_WINDOW_TOKEN,
            useFactory: (windowService: WindowService) => windowService.getWindowObject(),
            deps: [WindowService]
        },

        // Fournir le Web3ConfigService pour gérer la configuration de Web3
        Web3ConfigService,
        {
            provide: WEB3_CONFIG,
            useFactory: () => ({ wallets: [], activeWallet: null, overallState: Web3OverallState.noInit }) 
        },

        // Fournir le Web3StateService et ses dépendances en premier pour gérer l'état global de Web3
        StateAnomalyDetector,
        StateChangesDetector,
        Web3StateService,

        // Fournir le NonceProviderInitializer pour initialiser le fournisseur de Nonce pour les signatures
        NonceProviderInitializer,

        // Fournir le WalletInitializerService pour initialiser les wallets
        WalletInitializerService,

        // Fournir le Web3AuthService pour gerer l'authentification web3 en temps réel
        Web3AuthService,

        // Fournir le WalletSelectorService pour sélectionner le wallet actif
        WalletSelectorService,

        // Fournir le WalletActionService pour effectuer des actions sur le wallet actif
        WalletActionService,

        // D'autres services Web3 peuvent être ajoutés ici si nécessaire
    ];

    // Retourner la liste des providers
    return providers;
};
