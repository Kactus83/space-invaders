import UserRepository from '../repositories/UserRepository';
import HashingUtil from '../utils/HashingUtil';
import Web3Util from '../utils/Web3Util';
import { User } from '../models/user/User';
import { NonceService } from './NonceService';
import { ClassicSignInRequest } from '../models/sign-in/ClassicSignInRequest';
import { Web3SignInRequest } from '../models/sign-in/Web3SignInRequest';
import { SignatureData } from '../models/signature/SignatureData';

export class UserAuthenticationService {
    private userRepository: UserRepository;
    private nonceService: NonceService;

    constructor(userRepository: UserRepository, nonceService: NonceService) {
        this.userRepository = userRepository;
        this.nonceService = nonceService;
    }

    /**
     * Authenticate a user using their email and password.
     * 
     * @param signInData Data from the classic sign-in request.
     * @returns The authenticated user without the password.
     */
    public async authenticateUser(signInData: ClassicSignInRequest): Promise<User> {
        const { email, password } = signInData;
        const user = await this.userRepository.getUserByEmail(email);
        if (!user || !user.password) {
            throw new Error('User not found or no password set for this user.');
        }

        const passwordIsValid = await HashingUtil.verifyPassword(password, user.password);
        if (!passwordIsValid) {
            throw new Error('Incorrect password.');
        }

        return { ...user, password: null };
    }

    /**
     * Authenticate a user using their wallet address and a signature.
     * This function verifies the user's signature according to the EIP-712 standard
     * and authenticates the user if the signature is valid.
     *
     * @param signInData Data from the Web3 sign-in request containing wallet address and signature.
     * @returns The authenticated user without the password.
     * @throws Error if the signature is invalid or if the user is not found.
     */
    public async authenticateUserWeb3(signInData: Web3SignInRequest): Promise<User> {
        const { wallet, signature } = signInData;
        const user = await this.userRepository.getUserByWalletAddress(wallet);
        if (!user) {
            throw new Error('User not found.');
        }
    
        // Get the stored nonce for the wallet address (nonce validity is checked in getNonceForVerification)
        const storedNonce = await this.nonceService.getNonceForVerification(wallet);
        console.log('Stored Nonce:', storedNonce);
        const signatureData = Web3Util.constructEIP712Message(storedNonce, wallet);
        console.log('Signature Data:', signatureData);
    
        // Use Web3Util to verify the signature with the EIP-712 structured message
        const recoveredAddress = Web3Util.verifyEIP712Signature(signatureData, signature);
        console.log('Recovered Address:', recoveredAddress);
    
        // Verify if the recovered address matches the wallet address
        if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
            throw new Error('Invalid signature.');
        }
    
        return { ...user, password: null };
    }
    
    /**
     * Retrieves a structured message for signature based on the EIP-712 standard.
     * This message is used for signing with a wallet like MetaMask.
     * 
     * @param walletAddress The wallet address for which to retrieve the message.
     * @returns The structured message as per the EIP-712 standard.
     */
    public async getMessageForSignature(walletAddress: string): Promise<SignatureData> {
        const storedNonce = await this.nonceService.getNonceForSignature(walletAddress);
        return Web3Util.constructEIP712Message(storedNonce, walletAddress);
    }
}