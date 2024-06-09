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

  // sources
  signup$ = new Subject<Credentials>();
  login$ = new Subject<Credentials>();

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
    // reducers
    this.signup$.pipe(
      takeUntilDestroyed(),
      tap(() => this.setError(null)),
      switchMap((credentials) =>
        this.http.post<TokenResponse>(this.apiUrl + '/signup', credentials).pipe(
          tap(() => this.setUser(credentials)),
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
    })

    this.login$.pipe(
      takeUntilDestroyed(),
      tap(() => this.setError(null)),
      switchMap((credentials) =>
        this.http.post<TokenResponse>(this.apiUrl + '/login', credentials).pipe(
          tap(() => this.setUser(credentials)),
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
    })
  }

  private setToken(token: AuthState['token']) {
    this.state.update((prev) => ({...prev, token}));
  }

  private setUser(credentials: Credentials) {
    this.state.update((prev) => ({
      ...prev,
      currentUser: {email: credentials.email}
    }));
  }

  private setError(error: AuthState['error']) {
    this.state.update((prev) => ({
      ...prev,
      error,
    }))
  }
}
