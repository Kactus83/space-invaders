import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3ConfigService } from '@web3/services/config/web3-config.service';
import { catchError, from, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { AuthUtils } from './auth.utils';
import { UserService } from '../user/user.service';
import { Web3AuthState, Web3Config } from '@web3/services/config/web3-config.types';
import { ClassicSignInRequest, ClassicSignUpRequest, FullSignUpRequest, SignUpType, Web3SignInRequest, Web3SignUpRequest } from './auth.types';

interface SignInResponse {
    accessToken: string;
    user: any; 
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _web3Authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _web3ConfigService: Web3ConfigService
    ) {
        // Observe Web3 configuration changes
        this._web3ConfigService.config$.subscribe(config => {
            this._web3Authenticated = !!config.authState; // Set to true if authState is not null
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    
    // Getter for Web3 authentication status
    get web3Authenticated(): boolean {
        return this._web3Authenticated;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: ClassicSignInRequest): Observable<any> {
        if (this._authenticated) {
            return throwError(() => new Error('User is already logged in.'));
        }

        return this._httpClient.post('http://localhost:3001/sign-in', credentials).pipe(
            switchMap((response: SignInResponse) => {
                this.handleSignInResponse(response);
                return of(response);
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    /**
     * Sign in with Web3 (e.g., MetaMask)
     * This function handles the authentication of a user using their Web3 wallet.
     * It uses the Web3ConfigService to get the current authentication state and sends it to the backend for verification.
     * @returns An Observable that resolves to the authentication response.
     */
    signInWithWeb3(): Observable<any> {
        if (this._authenticated) {
            return throwError(() => new Error('User is already logged in.'));
        }

        // Get the current Web3 configuration
        const web3Config: Web3Config = this._web3ConfigService.getCurrentConfig();
        const authState: Web3AuthState | null = web3Config.authState;

        // If no authentication state is present, throw an error
        if (!authState) {
            return throwError(() => new Error('No Web3 authentication state found.'));
        }

        // Prepare the sign-in data
        const signInData: Web3SignInRequest = {
            wallet: authState.address,
            signature: authState.signature
        };

        // Send the sign-in request to the backend
        return this._httpClient.post<SignInResponse>('http://localhost:3001/sign-in/web3', signInData).pipe(
            tap(response => this.handleSignInResponse(response)),
            catchError(error => this.handleError(error))
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() => of(false)), // Return false in case of an error
            switchMap((response: any) => {
                // Check if response has accessToken and update it if present
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Update user data
                this._authenticated = true;
                this._userService.user = response.user;

                return of(true); // Return true after updating user data and token
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up Classic
     *
     * This function handles the registration of a new user using their email and password.
     * It sends the user details to the backend for a classic sign-up process.
     *
     * @param user The user's details.
     * @returns An Observable that resolves to the sign-up response.
     */
    signUpClassic(user: ClassicSignUpRequest): Observable<any> {
        return this._httpClient.post('http://localhost:3001/sign-up/classic', user).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    /**
     * Sign up with Web3
     * This function handles the registration of a new user using their Ethereum wallet.
     * It uses the Web3ConfigService to get the current authentication state and sends it to the backend for the sign-up process.
     * @param user The user's details including their wallet address.
     * @returns An Observable that resolves to the sign-up response.
     */
    signUpWeb3(user: Web3SignUpRequest): Observable<any> {
        // Get the current Web3 configuration
        const web3Config: Web3Config = this._web3ConfigService.getCurrentConfig();
        const authState: Web3AuthState | null = web3Config.authState;

        // If no authentication state is present, throw an error
        if (!authState) {
            return throwError(() => new Error('No Web3 authentication state found.'));
        }

        // Prepare the sign-up data, including the authentication state
        const signUpData: Web3SignUpRequest = {
            ...user,
            wallet: authState.address,
            signature: authState.signature
        };

        console.log('signUpData sent by front end:', signUpData);

        // Send the sign-up request to the backend
        return this._httpClient.post('http://localhost:3001/sign-up/web3', signUpData).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    /**
     * Full Sign up
     * This function handles the registration of a new user using both their email, password,
     * Ethereum wallet, and a signature. It uses the Web3ConfigService to get the current authentication state
     * and sends all details to the backend.
     * @param user The user's details including their wallet address.
     * @returns An Observable that resolves to the sign-up response.
     */
    signUpFull(user: FullSignUpRequest): Observable<any> {
        // Get the current Web3 configuration
        const web3Config: Web3Config = this._web3ConfigService.getCurrentConfig();
        const authState: Web3AuthState | null = web3Config.authState;

        // If no authentication state is present, throw an error
        if (!authState) {
            return throwError(() => new Error('No Web3 authentication state found.'));
        }

        // Prepare the full sign-up data, including the authentication state
        const signUpData: FullSignUpRequest = {
            ...user,
            wallet: authState.address,
            signature: authState.signature
        };

        console.log('signUpData:', signUpData);

        // Send the full sign-up request to the backend
        return this._httpClient.post('http://localhost:3001/sign-up/full', signUpData).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }


    /**
     * Signs up a user based on the provided FullSignUpRequest. 
     * This function determines the correct sign-up method (classic, web3, or full) and calls it.
     *
     * @param request The full sign-up request to process.
     * @returns An Observable that resolves to the sign-up response.
     */
    signUp(request: FullSignUpRequest): Observable<any> {
        const type = this.determineSignUpType(request);
        return this.transformSignUpRequest(request, type).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    /**
     * Determines the type of sign-up request based on the provided FullSignUpRequest and the current Web3 authentication status.
     * @param request The full sign-up request to analyze.
     * @returns The determined type of sign-up request.
     */
    private determineSignUpType(request: FullSignUpRequest): SignUpType {
        if (this._web3Authenticated) {
            if (request.email && request.password) {
                return SignUpType.Full;
            } else {
                return SignUpType.Web3;
            }
        } else {
            return SignUpType.Classic;
        }
    }

    /**
     * Transforms the given FullSignUpRequest into the appropriate sign-up request based on the specified type.
     * @param request The full sign-up request to transform.
     * @param type The type of sign-up request to create.
     * @returns An Observable that resolves to the appropriate sign-up response.
     */
    private transformSignUpRequest(request: FullSignUpRequest, type: SignUpType): Observable<any> {
        switch (type) {
            case SignUpType.Classic:
                const classicSignUpData: ClassicSignUpRequest = {
                    email: request.email,
                    password: request.password,
                    name: request.name,
                    company: request.company
                };
                return this.signUpClassic(classicSignUpData);

            case SignUpType.Web3:
                const web3SignUpData: Web3SignUpRequest = {
                    wallet: request.wallet,
                    signature: request.signature,
                    name: request.name,
                    company: request.company
                };
                return this.signUpWeb3(web3SignUpData);

            case SignUpType.Full:
                return this.signUpFull(request);

            default:
                return throwError(() => new Error('Invalid sign-up request type.'));
        }
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Handle the response from the sign-in process.
     *
     * @param response The response received from the backend after sign-in.
     */
    private handleSignInResponse(response: SignInResponse): void {
        this.accessToken = response.accessToken;
        this._authenticated = true;
        this._userService.user = response.user;
        console.log('Received JWT Token:', response.accessToken);
    }

    /**
     * Handle HTTP errors by extracting error message or providing a default one.
     *
     * @param error The HttpErrorResponse received.
     * @returns An Observable throwing the error with the extracted message.
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        const errorMessage = error.error?.message || error.error?.error || 'Something went wrong. Please try again later.';
        console.error('AuthService Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
