import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Web3ConfigService } from '@web3/services/config/web3-config.service';
import { Web3Config, Web3OverallState } from '@web3/services/config/web3-config.types';

@Component({
    selector: 'web3-config-card',
    templateUrl: './web3-config-card.component.html',
    styleUrls: ['./web3-config-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs       : 'web3-sign-up-form',
    standalone     : true,
    imports        : [NgIf, MatIconModule, MatButtonModule, MatCardModule, MatCardModule, NgClass, AsyncPipe]
})
export class Web3ConfigCardComponent implements OnInit {
    // Expose l'énumération au template
    Web3OverallState = Web3OverallState; 

    web3Config: Web3Config;

    constructor(private web3ConfigService: Web3ConfigService) {}

    ngOnInit(): void {
        // Get the current Web3 configuration
        this.web3ConfigService.config$.subscribe(config => {
            this.web3Config = config;
        });
    }

    // ... (other methods if needed)
}
