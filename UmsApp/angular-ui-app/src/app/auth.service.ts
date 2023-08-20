import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private broadcastChannel: BroadcastChannel;
  constructor(private http: HttpClient, private router: Router) {
    this.broadcastChannel = new BroadcastChannel('auth_channel');

    this.broadcastChannel.addEventListener('message', (event) => {
      if (event.data === 'logout') {
        this.logout();
      }
    });
  }

  logout() {
    this.http.post('/api/logout', {}).subscribe(
      () => {
        localStorage.removeItem('token');
        this.setLoginStatus(false);
        this.router.navigate(['/login']);
        this.broadcastChannel.postMessage('logout');
        window.location.reload();
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }

  setLoginStatus(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }
}
