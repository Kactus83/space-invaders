import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Config, Web3OverallState } from '@web3/services/config/web3-config.types';
import { Web3ConfigService } from '@web3/services/config/web3-config.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Web3AuthComponent } from '../web3-auth/web3-auth.component';
import { WalletConnectorComponent } from '../wallet-connector/wallet-connector.component';
import { Web3ConfigCardComponent } from '../web3-config-card/web3-config-card.component';

@Component({
    selector: 'web3-sign-up-form',
    templateUrl: './web3-sign-up-form.component.html',
    // styleUrls: ['./web3-sign-up-form.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    exportAs       : 'web3-sign-up-form',
    standalone     : true,
    imports        : [NgIf, MatIconModule, MatButtonModule, Web3AuthComponent, Web3ConfigCardComponent, WalletConnectorComponent, AsyncPipe]
})
export class Web3SignUpFormComponent implements OnInit {
    config$: Observable<Web3Config>;
    _config: Web3Config;
    Web3OverallState = Web3OverallState;

    constructor(private web3ConfigService: Web3ConfigService) {}

    ngOnInit(): void {
        // Obtenir la configuration Web3 en temps réel
        this.config$ = this.web3ConfigService.config$;

        this.config$.subscribe((config) => {
            this._config = config;
        });
    }

    onWalletSelected(): void {
        // Gérer l'événement de sélection du portefeuille ici si nécessaire
    }

    onSignedIn(): void {
        // Gérer l'événement de connexion réussie ici si nécessaire
    }
}
