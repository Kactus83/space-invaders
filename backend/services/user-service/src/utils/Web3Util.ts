import Web3 from 'web3';
import { recoverTypedSignature_v4 } from 'eth-sig-util';
import { EIP712Domain, SignatureData, SignatureMessage } from '../models/signature/SignatureData';

export default class Web3Util {
    private static web3: Web3 = new Web3('http://ganache:8545'); // a mettre en constante

    /**
     * Recovers the address associated with a given signature.
     * 
     * @param message The message that was signed.
     * @param signature The signature to verify.
     * @returns The recovered address.
     */
    public static recoverAddress(message: string, signature: string): string {
        return this.web3.eth.accounts.recover(message, signature);
    }    

    /**
     * Constructs a structured EIP-712 message for signing.
     * This function builds a structured message that conforms to the EIP-712 standard,
     * making it user-friendly and secure for signing with a wallet like MetaMask.
     *
     * @param nonce The unique nonce for the session.
     * @param walletAddress The wallet address of the user.
     * @returns A structured message ready for signing.
     */
    public static constructEIP712Message(nonce: string, walletAddress: string): SignatureData {
        const domain: EIP712Domain = {
            name: 'YourDappName',
            version: '1',
            chainId: 1, 
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC' 
        };

        const message: SignatureMessage = {
            nonce,
            from: walletAddress
        };

        const signatureData: SignatureData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' }
                ],
                SignatureMessage: [
                    { name: 'nonce', type: 'string' },
                    { name: 'from', type: 'address' },
                    // Ajoutez des définitions pour d'autres champs ici si nécessaire
                    // { name: 'timestamp', type: 'string' },
                    // { name: 'action', type: 'string' }
                ]
            },
            domain,
            primaryType: 'SignatureMessage',
            message
        };
        
        console.log('------------------------------  Signature Data Construction :', signatureData);
        return signatureData;
    }
    
    /**
     * Verifies an EIP-712 signature with the provided signature data.
     * 
     * @param signatureData The structured signature data.
     * @param signature The signature to verify.
     * @returns The recovered address if the signature is valid.
     */
    public static verifyEIP712Signature(signatureData: SignatureData, signature: string): string {
        // Convert SignatureData to a format suitable for EIP-712 signature verification
        const data = JSON.stringify(signatureData);
        console.log('------------------------------  Signature Data Verification :', data);

        // Use eth-sig-util to verify the signature with the EIP-712 structured message
        const recoveredAddress = recoverTypedSignature_v4({
            data: JSON.parse(data),
            sig: signature
        });

        return recoveredAddress;
    }
}


