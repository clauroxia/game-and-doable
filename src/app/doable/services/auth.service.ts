import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NEVER, Subject, catchError, switchMap, tap } from 'rxjs';
import { AuthState, Credentials, TokenResponse } from '../interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://doable-api-production.up.railway.app';
  private tokenKey = 'user-token';
  private user = 'user';

  // sources
  signup$ = new Subject<Credentials>();
  login$ = new Subject<Credentials>();
  logout$ = new Subject<void>();

  // state
  state = signal<AuthState>({
    currentUser: null,
    token: null,
    error: null,
  });

  // selectors
  currentUser = computed(() => this.state().currentUser);
  token = computed(() => this.state().token);
  error = computed(() => this.state().error);

  constructor() {
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.user);
    console.log(token, user);
    if(token && user) {
      this.setToken(token);
      this.setUser(user);
    }
     
    // reducers
    this.signup$.pipe(
      takeUntilDestroyed(),
      tap(() => this.setError(null)),
      switchMap((credentials) =>
        this.http.post<TokenResponse>(this.apiUrl + '/signup', credentials).pipe(
          tap(() => {
            this.setUser(credentials.email);
            localStorage.setItem(this.user, credentials.email);
          }),
          catchError((errorResponse) => {
            console.log(errorResponse);
            this.setError(errorResponse.error.errors.join());
            return NEVER;
          })
        )
      )
    )
    .subscribe((response) => {
      const { token } = response;
      this.setToken(token);
      localStorage.setItem(this.tokenKey, token);
    })

    this.login$.pipe(
      takeUntilDestroyed(),
      tap(() => this.setError(null)),
      switchMap((credentials) =>
        this.http.post<TokenResponse>(this.apiUrl + '/login', credentials).pipe(
          tap(() => {
            this.setUser(credentials.email);
            localStorage.setItem(this.user, credentials.email);
          }),
          catchError((errorResponse) => {
            console.log(errorResponse);
            this.setError(errorResponse.error.errors.join());
            return NEVER;
          })
        )
      )
    )
    .subscribe((response) => {
      const { token } = response;
      this.setToken(token);
      localStorage.setItem(this.tokenKey, token);
    })

    this.logout$
      .pipe(
        takeUntilDestroyed(),
        tap(() => {
          this.resetState();
          localStorage.removeItem(this.tokenKey);
          localStorage.removeItem(this.user);
        }),
        switchMap(() => 
          this.http.delete(this.apiUrl + '/logout', {
            headers: {
              Authorization: `Token token=${this.token()}`
            }
          })
        )
      )
      .subscribe(() => this.setToken(null))
  }

  private setToken(token: AuthState['token']) {
    this.state.update((prev) => ({...prev, token}));
  }

  private setUser(user: string) {
    this.state.update((prev) => ({
      ...prev,
      currentUser: {email: user}
    }));
  }

  private setError(error: AuthState['error']) {
    this.state.update((prev) => ({
      ...prev,
      error,
    }))
  }

  private resetState() {
    this.state.update((prev) => ({ 
      ...prev,
      currentUser: null,
      error: null
    }));
  }
}
