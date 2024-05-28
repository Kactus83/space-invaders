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
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'web3-sign-up-form-full',
    templateUrl: './web3-sign-up-form-full.component.html',
    styleUrls: ['./web3-sign-up-form-full.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    exportAs       : 'web3-sign-up-form-full',
    standalone     : true,
    imports        : [NgIf, MatIconModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, Web3AuthComponent, Web3ConfigCardComponent, WalletConnectorComponent, AsyncPipe, ReactiveFormsModule, RouterModule]
})
export class Web3SignUpFormFullComponent implements OnInit {
    @Output() signUpData = new EventEmitter<any>(); 
    config$: Observable<Web3Config>;
    signUpForm: UntypedFormGroup;
    isWeb3Authenticated: boolean = false;
    isClassicSignUpValid: boolean = false;
    isFullyAuthenticated: boolean = false;
    Web3OverallState = Web3OverallState;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _web3ConfigService: Web3ConfigService
    ) {}

    ngOnInit(): void {
        this.signUpForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            name: [''],
            company: [''],
            agreements: ['', Validators.requiredTrue],
            showAdditionalFields: [false],
        });

        this.config$ = this._web3ConfigService.config$;
        this.config$.subscribe((config) => {
            this.updateAuthenticationStatus(config);
        });

        this.signUpForm.valueChanges.subscribe(() => {
            this.updateAuthenticationStatus();
        });
        
        
    }
    
    /**
     * Updates the state of Web3 and classic sign-up authentication based on the current configuration and form values.
     * It determines whether the user is authenticated through Web3, classic sign-up, or both.
     * @param config Optional Web3 configuration object used to determine the Web3 authentication status.
     */
    private updateAuthenticationStatus(config?: Web3Config): void {
        const currentConfig = config || this._web3ConfigService.getCurrentConfig();
        this.isWeb3Authenticated = currentConfig.overallState === Web3OverallState.UserAuthenticated && this.signUpForm.get('agreements').value === true;
        this.isClassicSignUpValid = this.signUpForm.valid;

        // Determine if both Web3 and classic sign-up are authenticated
        this.isFullyAuthenticated = this.isWeb3Authenticated && this.isClassicSignUpValid;
        
        this.emitSignUpData();
    }

    private emitSignUpData(): void {
        const signUpData = {
            config: this._web3ConfigService.getCurrentConfig(),
            formValues: this.signUpForm.value,
            isWeb3Authenticated: this.isWeb3Authenticated,
            isClassicSignUpValid: this.isClassicSignUpValid
        };
        this.signUpData.emit(signUpData);
    }
}