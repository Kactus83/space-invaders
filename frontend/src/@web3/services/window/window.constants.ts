import { InjectionToken } from '@angular/core';
import { Web3WindowObject } from './window.types';

// Token pour l'objet global window
export const WINDOW = new InjectionToken<Window>('Window');

// Tokens pour les objets spécifiques de chaque wallet
export const ETHEREUM_TOKEN = new InjectionToken<any>('EthereumObject');
export const BINANCE_TOKEN = new InjectionToken<any>('BinanceObject');

// Token pour l'objet qui contiendra tous les tokens de wallets
export const WEB3_WINDOW_TOKEN = new InjectionToken<Web3WindowObject>('Web3WindowToken');
