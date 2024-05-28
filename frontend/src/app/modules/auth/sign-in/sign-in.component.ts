import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { Web3SignInFormComponent } from '@web3/components/web3-sign-in-form/web3-sign-in-form.component';
import { Web3OverallState } from '@web3/services/config/web3-config.types';
import { AuthService } from 'app/core/auth/auth.service';
import { ClassicSignInRequest } from 'app/core/auth/auth.types';
import { from } from 'rxjs';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, Web3SignInFormComponent],
})


export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    Web3OverallState = Web3OverallState;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
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
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }
    
        this.signInForm.disable();
        this.showAlert = false;
        console.log('Signing in');
    
        const signInData: ClassicSignInRequest = {
            email: this.signInForm.value.email,
            password: this.signInForm.value.password
        };
    
        this._authService.signIn(signInData).subscribe(
            (response) => {
                console.log('Sign in response:', response);
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (error) => {
                console.error('Error during sign in:', error);
    
                this.signInForm.enable();
                this.signInNgForm.resetForm();
    
                const errorMessage = error.message || 'Wrong email or password';
                this.alert = {
                    type: 'error',
                    message: errorMessage,
                };
    
                this.showAlert = true;
            }
        );
    }
    

    /**
     * Sign in with Metamask
     */
    signInWithMetamask(): void {
        this.signInForm.disable();
        this.showAlert = false;
        console.log('Signing in');
    
        from(this._authService.signInWithWeb3()).subscribe(
            (response) => {
                console.log('Sign in response:', response);
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
            },
            (error) => {
                console.error('Error during sign in with MetaMask:', error);
    
                this.signInForm.enable();
    
                const errorMessage = error.message || 'MetaMask sign-in failed. Please try again.';
                this.alert = {
                    type: 'error',
                    message: errorMessage,
                };
                this.showAlert = true;
            }
        );
    }  

    handleWeb3SignedIn(event: any) {
        console.log('Utilisateur connecté via Web3:', event);
        this.signInWithMetamask();
    }  
}
