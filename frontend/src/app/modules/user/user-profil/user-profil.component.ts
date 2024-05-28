import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
    selector     : 'user-profil',
    standalone   : true,
    templateUrl  : './user-profil.component.html',
    encapsulation: ViewEncapsulation.None,
    imports      : [RouterLink, FuseAlertComponent, NgIf],
})
export class UserProfilComponent implements OnInit {
    userProfile: User | null = null;

    /**
     * Constructor
     */
    constructor(private _userService: UserService) {}

    ngOnInit(): void {
        this._userService.user$.subscribe((user: User) => {
            this.userProfile = user;
        });

        this._userService.get().subscribe();
    }
}
