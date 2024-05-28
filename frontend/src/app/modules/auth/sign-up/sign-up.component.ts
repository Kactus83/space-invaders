import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { Web3SignUpFormFullComponent } from '@web3/components/web3-sign-up-form-full/web3-sign-up-form-full.component';
import { Web3SignUpFormComponent } from '@web3/components/web3-sign-up-form/web3-sign-up-form.component';
import { AuthService } from 'app/core/auth/auth.service';
import { FullSignUpRequest } from 'app/core/auth/auth.types';
import { Observable, distinctUntilChanged } from 'rxjs';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, NgIf, FuseAlertComponent, Web3SignUpFormComponent , FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, Web3SignUpFormFullComponent],
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    canSubmitSignUp: boolean = false;
    isSubmitting: boolean = false;
    signUpData: any;
    showAlert: boolean = false;
    showAdditionalInfo: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void>
    {   
    }

    
    handleSignUpData(data: any): void {
        this.signUpData = data;
        // Ici, vous pouvez ajuster la logique pour déterminer si l'utilisateur peut soumettre le formulaire
        this.canSubmitSignUp = data.isWeb3Authenticated || data.isClassicSignUpValid;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    submitSignUp(): void {
        if (!this.canSubmitSignUp) {
            return;
        }
        this.isSubmitting = true;
    
        const fullSignUpData: FullSignUpRequest = {
            email: this.signUpData.formValues.email || '',
            password: this.signUpData.formValues.password || '',
            wallet: this.signUpData.config.activeWallet?.address || '',
            signature: this.signUpData.config.authState?.signature || '',
            name: this.signUpData.formValues.name,
            company: this.signUpData.formValues.company,
        };
    
        this._authService.signUp(fullSignUpData).subscribe(
            (response) => {
                this._router.navigateByUrl('/confirmation-required');
            },
            (error) => {
                console.error('Error during sign up:', error);
                this.isSubmitting = false;
                const errorMessage = error.message || 'Something went wrong, please try again.';
                this.alert = {
                    type: 'error',
                    message: errorMessage,
                };
                this.showAlert = true;
            }
        );
    }
}
