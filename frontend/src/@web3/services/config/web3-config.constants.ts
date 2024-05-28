import { InjectionToken } from '@angular/core';
import { Web3Config } from './web3-config.types';

// Token for Web3 configuration object
export const WEB3_CONFIG = new InjectionToken<Web3Config>('WEB3_APP_CONFIG');
