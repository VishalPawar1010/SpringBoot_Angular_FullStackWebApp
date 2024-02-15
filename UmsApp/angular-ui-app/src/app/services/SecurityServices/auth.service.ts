import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  private broadcastChannel: BroadcastChannel;
  constructor(private http: HttpClient, private router: Router, private cookieService : CookieService) {
    this.broadcastChannel = new BroadcastChannel('auth_channel');

    this.broadcastChannel.addEventListener('message', (event) => {
      if (event.data === 'logout') {
        this.logout();
      }
    });
  }
  
  logout() {
    let url = environment.serverUrl + '/logout';
    this.http.post(url, {}).subscribe(
      () => {
        // localStorage.removeItem('token');
        this.cookieService.delete('token');
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
