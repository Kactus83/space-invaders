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
    selector: 'web3-sign-in-form',
    templateUrl: './web3-sign-in-form.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'web3-sign-in-form',
    standalone: true,
    imports: [NgIf, MatIconModule, MatButtonModule, Web3AuthComponent, WalletConnectorComponent, AsyncPipe]
})
export class Web3SignInFormComponent implements OnInit {
    config$: Observable<Web3Config>;
    _config: Web3Config;
    Web3OverallState = Web3OverallState;

    // Output decorator for signed in event emitter
    @Output() signedIn = new EventEmitter<any>(); 

    constructor(private web3ConfigService: Web3ConfigService) {}

    onSignatureCompleted(event: any): void {
        console.log('Signature completed event received:', event);
        if (event.success) {
            console.log('Successful signature:', event.data);
            this.signedIn.emit(event.data);
        } else {
            console.error('Signature failed:', event.error);
            // Gérer l'échec de la signature ici si nécessaire
        }
    }

    ngOnInit(): void {
        // Subscribe to the Web3 configuration observable to get real-time updates
        this.config$ = this.web3ConfigService.config$;

        this.config$.subscribe((config) => {
            this._config = config;
        });
    }

    onWalletSelected(): void {
        // Handle the event of wallet selection here if necessary
    }

    // Emit the signed in event for the parent component to handle
    onSignedIn(event: any): void {
        console.log('Web3SignInFormComponent.onSignedIn', event);
        this.signedIn.emit(event);
    }
}
