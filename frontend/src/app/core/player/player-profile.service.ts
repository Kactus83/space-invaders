import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { FullPlayerProfile } from 'app/core/player/player-profile.types';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerProfileService {
    private _playerProfile: ReplaySubject<FullPlayerProfile> = new ReplaySubject<FullPlayerProfile>(1);

    constructor(private _httpClient: HttpClient, private _userService: UserService) { }

    set playerProfile(value: FullPlayerProfile) {
        this._playerProfile.next(value);
    }

    get playerProfile$(): Observable<FullPlayerProfile> {
        return this._playerProfile.asObservable();
    }

    getPlayerProfile(): Observable<FullPlayerProfile> {
        return this._httpClient.get<FullPlayerProfile>('http://localhost:3001/player/profile').pipe(
            tap((profile) => {
                this._playerProfile.next(profile);
            }),
        );
    }

    updatePlayerProfile(profile: FullPlayerProfile): Observable<any> {
        return this._httpClient.patch<FullPlayerProfile>('http://localhost:3001/player/profile', { profile }).pipe(
            tap((response) => {
                this._playerProfile.next(response);
            }),
        );
    }
}
