import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Web3AuthService } from '@web3/services/web3-auth/web3-auth.service';

@Component({
    selector: 'web3-auth',
    templateUrl: './web3-auth.component.html',
    styleUrls: ['./web3-auth.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'web3-auth',
    standalone: true,
    imports: [MatIconModule, MatButtonModule]
})
export class Web3AuthComponent implements OnInit {
    // Émetteur d'événements pour la fin de la procédure de signature
    @Output() signatureCompleted = new EventEmitter<any>();

    constructor(private web3AuthService: Web3AuthService) {}

    ngOnInit(): void {}

    /**
     * Request a signature for authentication
     */
    requestSignature(): void {
        this.web3AuthService.requestSignature().then((result) => {
            console.log('Signature request sent.');
            this.signatureCompleted.emit({ success: true, data: result });
        }).catch(error => {
            console.error('Error requesting signature:', error);
            this.signatureCompleted.emit({ success: false, error: error });
        });
    }
}
