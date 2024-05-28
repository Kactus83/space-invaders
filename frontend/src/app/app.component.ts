import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NonceProviderInitializer } from '@web3/services/nonce-provider-initializer/nonce-provider-initializer.service';
import { WalletInitializerService } from '@web3/services/wallet-initializer/wallet-initializer.service';
import { Web3StateService } from '@web3/services/web3-state/web3-state.service';
import { NonceProviderService } from './core/nonce-provider/nonce-provider.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private _walletInitializerService: WalletInitializerService,
        private _nonceProviderInitializer: NonceProviderInitializer,
        private _web3StateService: Web3StateService,
        private _nonceProvider: NonceProviderService,
    ) {
        // Appel de la méthode setNonceProvider pour configurer le fournisseur de nonce
        this._nonceProviderInitializer.setNonceProvider(this._nonceProvider);
    }
}
