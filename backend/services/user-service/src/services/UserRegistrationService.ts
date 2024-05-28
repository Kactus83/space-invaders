import UserRepository from '../repositories/UserRepository';
import HashingUtil from '../utils/HashingUtil';
import Web3Util from '../utils/Web3Util';
import { toFrontendUser } from '../utils/userTransforms';
import { User } from '../models/user/User';
import { FrontendUser } from '../models/user/FrontendUser';
import { NonceService } from './NonceService';
import { FullSignUpRequest } from '../models/sign-up/FullSignUpRequest';
import { ClassicSignUpRequest } from '../models/sign-up/ClassicSignUpRequest';
import { Web3SignUpRequest } from '../models/sign-up/Web3SignUpRequest';

export class UserRegistrationService {
    private userRepository: UserRepository;
    private nonceService: NonceService;

    constructor(userRepository: UserRepository, nonceService: NonceService) {
        this.userRepository = userRepository;
        this.nonceService = nonceService;
    }

    /**
     * Registers a new user based on the provided sign-up data.
     * It handles Classic, Web3, and Full sign-up requests.
     * For Web3 and Full sign-up, it verifies the signature before proceeding.
     * 
     * @param signUpData Data from the sign-up request.
     * @returns The created user as FrontendUser.
     */
    public async registerUser(signUpData: ClassicSignUpRequest | FullSignUpRequest | Web3SignUpRequest): Promise<FrontendUser> {
        console.log('Sign-up data in user registration service :', signUpData);
        // If it's a Web3 or Full sign-up, verify the signature first
        if ('wallet' in signUpData && 'signature' in signUpData) {
            console.log('Verifying Web3 signature...');
            await this.verifyWeb3Signature(signUpData);
        }

        console.log('Creating user...', signUpData);

        let user: User;

        // Vérifiez si toutes les données requises pour un sign-up Full sont présentes
        if ('email' in signUpData && 'password' in signUpData && 'wallet' in signUpData && 'signature' in signUpData) {
            user = await this.transformFullSignUpToUser(signUpData as FullSignUpRequest);
        } 
        // Sinon, vérifiez si c'est un sign-up Classic
        else if ('email' in signUpData && 'password' in signUpData) {
            user = await this.transformClassicSignUpToUser(signUpData as ClassicSignUpRequest);
        } 
        // Sinon, assumez que c'est un sign-up Web3
        else if ('wallet' in signUpData && 'signature' in signUpData) {
            user = await this.transformWeb3SignUpToUser(signUpData as Web3SignUpRequest);
        } else {
            throw new Error('Invalid sign-up data.');
        }

        console.log('User created ...', user);

        const newUser = await this.userRepository.createUser(user);
        return toFrontendUser(newUser);
    }  

    /**
     * Verifies the signature for Web3 and Full sign-up requests.
     * 
     * @param signUpData Data from the Web3 or Full sign-up request.
     */
    private async verifyWeb3Signature(signUpData: Web3SignUpRequest | FullSignUpRequest): Promise<void> {
        const { wallet, signature } = signUpData;

        // Get the stored nonce for the wallet address (nonce validity is checked in getNonceForVerification)
        const storedNonce = await this.nonceService.getNonceForVerification(wallet);

        // Construct the structured EIP-712 message
        const signatureData = Web3Util.constructEIP712Message(storedNonce, wallet);

        // Use Web3Util to verify the signature with the EIP-712 structured message
        const recoveredAddress = Web3Util.verifyEIP712Signature(signatureData, signature);

        // Verify if the recovered address matches the wallet address
        if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
            throw new Error('Invalid signature.');
        }
    }

    private async transformClassicSignUpToUser(data: ClassicSignUpRequest): Promise<User> {
        const hashedPassword = data.password ? await HashingUtil.hashPassword(data.password) : null;
        return {
            id: 0,  // Placeholder, the actual id will be assigned by the database.
            name: data.name,
            wallet: null,  // Not applicable for classic sign-up.
            email: data.email,
            password: hashedPassword,
            company: data.company,
            avatar: null,  // Default or set by user later.
            status: null,  // Default or set by user later.
            isEmailVerified: false,  // Default, to be updated after email verification.
            isWalletVerified: false, // Not applicable for classic sign-up.
            isLocked: false,  // Default, can be updated based on app's logic.
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    private async transformWeb3SignUpToUser(data: Web3SignUpRequest): Promise<User> {
        // Web3SignUp does not have an email or password, but has a wallet and signature.
        return {
            id: 0,
            name: data.name,
            wallet: data.wallet,
            email: null,
            password: null,
            company: data.company,
            avatar: null,
            status: null,
            isEmailVerified: false,
            isWalletVerified: true,
            isLocked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    private async transformFullSignUpToUser(data: FullSignUpRequest): Promise<User> {
        const hashedPassword = data.password ? await HashingUtil.hashPassword(data.password) : null;
        // FullSignUp has both email/password and wallet/signature.
        return {
            id: 0,
            name: data.name,
            wallet: data.wallet,
            email: data.email,
            password: hashedPassword,
            company: data.company,
            avatar: null,
            status: null,
            isEmailVerified: false,  // Email needs to be verified for Full sign-up.
            isWalletVerified: true,  // Wallet is considered verified for Full sign-up.
            isLocked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}